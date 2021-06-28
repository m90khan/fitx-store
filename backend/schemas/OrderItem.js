const {
  Text,
  Select,
  Integer,
  adminConfig,
  Relationship,
} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');

const OrderItem = {
  // TODO
  // access:
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    description: {
      type: Wysiwyg,
      Default: {
        automatic_uploads: false,
      },
      ui: {
        displayMode: 'textarea',
      },
    },
    photo: {
      type: Relationship,
      ref: 'ProductImage',
      labelField: 'Source',
    },

    price: {
      type: Integer,
    },
    quantity: {
      type: Integer,
    },
    order: {
      type: Relationship,
      ref: 'Order.items',
    },
  },
};

module.exports = OrderItem;
