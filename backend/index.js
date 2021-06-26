require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
//  const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./seed-data/index');
const ProductSchema = require('./schemas/Product');
const UserSchema = require('./schemas/User');
const ProductImage = require('./schemas/ProductImage');
 const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'Sando Store';
const adapterConfig = { mongoUri: `${process.env.DATABASE_URL}` };
const session = require('@keystonejs/session');
const { ForgottenPasswordToken, customSchema } = require('./schemas/PasswordReset');
const { userIsAdmin, userIsAdminOrOwner } = require('./access');
const { sendEmail } = require('./emails');

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookie: {
    maxAge: 60 * 60 * 24 * 180, // How long they stay signed in? 180 days
    secure: process.env.NODE_ENV === 'production',
  
  },
  cookieSecret: process.env.COOKIE_SECRET,
// TOPIC : IMPLEMENT SESSIONS

   // onConnect:   initialiseData,
});
 
keystone.createList('Product', {
  fields: ProductSchema.fields,
  labelField: 'name',
});

keystone.createList('ProductImage', {
  fields: ProductImage.fields,
});

keystone.createList('User', {
  fields: UserSchema.fields,
  // List-level access controls
 
  access: {
    read: ()=>true,
    update: userIsAdminOrOwner,
    create: ()=>true,
    delete: userIsAdmin,
    auth: true,
  },
  hooks: {
    afterChange: async ({ updatedItem, existingItem }) => {
      if (existingItem && updatedItem.password !== existingItem.password) {
        const url = process.env.SERVER_URL || 'http://localhost:3000';
        const pathUrl = `${url}/account/login`;
        const props = {
          recipientEmail: updatedItem.email,
          followUrl: pathUrl,   // signIn url
          subject: 'Your password has been updated',
          text: `
          <div>
          <p>Hi {recipientEmail}</p>
          <div>
            <p>
              Your password has been updated you can log in{' '}
              <a href='${pathUrl}' target="_blank">
                here
              </a>
            </p>
          </div>
        </div>
          `
        };
        
        // const options = {
        //   to: updatedItem,
        //   from: 'test@example.com',
        //   domain: 'smtp.mailtrap.io',
        //   apiKey: '171d3878e9a3559f77c0dbf393e86810',
        // };

        await sendEmail(  props);
      }
    },
  },
});
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
keystone.extendGraphQLSchema(customSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password',
    protectIdentities: process.env.NODE_ENV === 'production',
   },
});
 module.exports = {
  keystone,
   apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: userIsAdmin,
    }),
   ],

};
