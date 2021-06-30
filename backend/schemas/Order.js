const {
  Text,
  Select,
  Integer,
  adminConfig,
  Virtual,
  Relationship,
} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const formatMoney = require('../utils/formatMoney');
const {
  userIsAdmin,
  userIsAdminOrOwner,
  userOwnsItem,
  isLoggedIn,
  rules,
} = require('../access');
const Order = {
  fields: {
    // label: {
    //   type: Virtual,
    //   resolver: (item) => `${formatMoney(item.total)}`,
    // },
    total: {
      type: Integer,
      isRequired: true,
    },

    items: {
      type: Relationship,
      ref: 'OrderItem.order',
      many: true,
    },
    user: {
      type: Relationship,
      ref: 'User.orders',
    },
    charge: {
      type: Text,
    },
  },
  access: {
    create: isLoggedIn,
    read: rules.canOrder,
    update:   false,
    delete:   false,
  },
};

module.exports = Order;
