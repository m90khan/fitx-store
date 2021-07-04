const { Text, Select, Password, Relationship, Checkbox } = require('@keystonejs/fields');
const {
  userIsAdmin,
  userIsAdminOrOwner,
  userOwnsItem,
  isLoggedIn,
  rules,
  permissions,
} = require('../access');
const { sendEmail } = require('../emails');

const User = {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
    cart: {
      type: Relationship,
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    },
    orders: {
      type: Relationship,
      ref: 'Order.user',
      many: true,
    },
    role: {
      type: Relationship,
      ref: 'Role.assignedTo',
    },
    products: {
      type: Relationship,
      ref: 'Product.user',
      many: true,
    },
  },
  access: {
    create:   true,
    read:  isLoggedIn,
    update:  userOwnsItem,
    // only people with the permission can delete themselves!
    // You can't delete yourself
    delete: userIsAdmin,
  },
  hooks: {
    afterChange: async ({ updatedItem, existingItem }) => {
      console.log({ updatedItem, existingItem });
      if (existingItem && updatedItem.password !== existingItem.password) {
        const url = process.env.SERVER_URL || 'http://localhost:3000';
        const pathUrl = `${url}/account/login`;
        const props = {
          recipientEmail: updatedItem.email,
          followUrl: pathUrl, // signIn url
          subject: 'Your password has been updated',
          text: `
          <div>
          <p>Hi ${updatedItem.name}</p>
          <div>
            <p>
              Your password has been updated you can log in{' '}
              <a href='${pathUrl}' target="_blank">
                here
              </a>
            </p>
          </div>
        </div>
          `,
        };

        await sendEmail(props);
      }
    },
  },
};

module.exports = User;
