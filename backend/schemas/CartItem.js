const { isLoggedIn } = require('../access');

const {
  Text,
  Select,
  Integer,
  adminConfig,
  Relationship,
} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');

const CartItem = {
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    },
  },
  fields: {
    quantity: {
      type: Integer,
      defaultValue: 1,
      isRequired: true,
    },
    product: {
      type: Relationship,
      ref: 'Product', // reference to data type Product
    },

    user: {
      type: Relationship,
      ref: 'User.cart', // two way relationship
    },
  },
  access: {
    create: isLoggedIn,
    // read: rules.canOrder,
    // update: rules.canOrder,
    // delete: rules.canOrder,
    read: true,
    update: true,
    delete: true,
  },
};

module.exports = CartItem;
