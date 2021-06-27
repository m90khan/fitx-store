require('dotenv').config();
const User = require('./User');

const {
  Checkbox,
  DateTime,
  Integer,
  Password,
  Relationship,
  Select,
  Text,
} = require('@keystonejs/fields');
const { userIsAdmin } = require('../access');
const { v4: uuid } = require('uuid');
const { sendEmail } = require('../emails');

exports.ForgottenPasswordToken = {
  access: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  fields: {
    user: {
      type: Relationship,
      ref: 'User',
      access: {
        read: true,
      },
    },
    token: {
      type: Text,
      isRequired: true,
      isUnique: true,
      access: {
        read: true,
      },
    },
    requestedAt: { type: DateTime, isRequired: true },
    accessedAt: { type: DateTime },
    expiresAt: { type: DateTime, isRequired: true },
  },
  hooks: {
    afterChange: async ({ context, updatedItem, existingItem }) => {
      if (existingItem) return null;

      const now = new Date().toISOString();

      const { errors, data } = await context.executeGraphQL({
        context: context.sudo(),
        query: `
          query GetUserAndToken($user: ID!, $now: DateTime!) {
            User( where: { id: $user }) {
              id
              email
              name
            }
            allForgottenPasswordTokens( where: { user: { id: $user }, expiresAt_gte: $now }) {
              token
              expiresAt
            }
          }
        `,
        variables: { user: updatedItem.user.toString(), now },
      });

      if (errors) {
        console.error(errors, `Unable to construct password updated email.`);
        return;
      }
      const { allForgottenPasswordTokens, User } = data;
      const forgotPasswordKey = allForgottenPasswordTokens[0].token;
      const url = process.env.SERVER_URL || 'http://localhost:3000';
      const pathUrl = `${url}/account/changepassword?key=${forgotPasswordKey}`;
      const props = {
        // forgot password url
        followUrl: pathUrl,
        recipientEmail: User.email,
        subject: 'Request for password reset',
        text: `
          <div>
          <p>Hi ${User.name}</p>
          <div>
            <p>
             You can reset your password by following the link Below{' '}
              <a href='${pathUrl}' target="_blank" style="display: "block" ">
                Click here
              </a>
            </p>
          </div>
        </div>
          `,
      };
      await sendEmail(props);
    },
  },
};

exports.customSchema = {
  mutations: [
    {
      schema: 'startPasswordRecovery(email: String!): ForgottenPasswordToken',
      resolver: async (obj, { email }, context) => {
        const token = uuid();
        const tokenExpiration =
          parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY) || 1000 * 60 * 60 * 24;

        const now = Date.now();
        const requestedAt = new Date(now).toISOString();
        const expiresAt = new Date(now + tokenExpiration).toISOString();

        const { errors: userErrors, data: userData } = await context.executeGraphQL({
          context: context.sudo(),
          query: `
              query findUserByEmail($email: String!) {
                allUsers(where: { email: $email }) {
                  id
                  email
                }
              }
            `,
          variables: { email: email },
        });

        if (userErrors || !userData.allUsers || !userData.allUsers.length) {
          console.error(
            userErrors,
            `Unable to find user when trying to create forgotten password token.`
          );
          return;
        }

        const userId = userData?.allUsers[0].id;
        const result = {
          userId,
          token,
          requestedAt,
          expiresAt,
        };

        const { errors, data: tokenData } = await context.executeGraphQL({
          context: context.sudo(),
          query: `
              mutation createForgottenPasswordToken(
                $userId: ID!,
                $token: String!,
                $requestedAt: DateTime,
                $expiresAt: DateTime,
              ) {
                createForgottenPasswordToken(data: {
                  user: { connect: { id: $userId }},
                  token: $token,
                  requestedAt: $requestedAt,
                  expiresAt: $expiresAt,
                }) {
                  id
                  token
                  user {
                    id
                  }
                  requestedAt
                  expiresAt
                }
              }
            `,
          variables: result,
        });
        if (errors) {
          console.error(errors, `Unable to create forgotten password token.`);
          return;
        }

        return true;
      },
    },
    {
      schema: 'changePasswordWithToken(token: String!, password: String!): User',
      resolver: async (obj, { token, password }, context) => {
        const now = Date.now();

        const { errors, data } = await context.executeGraphQL({
          context: context.sudo(),
          query: `
              query findUserFromToken($token: String!, $now: DateTime!) {
                passwordTokens: allForgottenPasswordTokens(where: { token: $token, expiresAt_gte: $now }) {
                  id
                  token
                  user {
                    id
                  }
                }
              }`,
          variables: { token, now },
        });

        if (errors || !data.passwordTokens || !data.passwordTokens.length) {
          console.error(errors, `Unable to find token`);
          throw errors.message;
        }

        const user = data.passwordTokens[0].user.id;
        const tokenId = data.passwordTokens[0].id;
        const { errors: passwordError } = await context.executeGraphQL({
          context: context.sudo(),
          query: `mutation UpdateUserPassword($user: ID!, $password: String!) {
              updateUser(id: $user, data: { password: $password }) {
                id
              }
            }`,
          variables: { user, password },
        });

        console.log({ user, password, tokenId });

        if (passwordError) {
          console.error(passwordError, `Unable to change password`);
          throw passwordError.message;
        }

        await context.executeGraphQL({
          context: context.sudo(),
          query: `mutation DeletePasswordToken($tokenId: ID!) {
              deleteForgottenPasswordToken(id: $tokenId) {
                id
              }
            }
          `,
          variables: { tokenId },
        });

        return true;
      },
    },
  ],
};
