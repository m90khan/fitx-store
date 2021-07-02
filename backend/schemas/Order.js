const {
  Text,
  Select,
  Integer,
  adminConfig,
  Virtual,
  Relationship,DateTimeUtc
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
const { createdAt, updatedAt, format,atTracking   } = require('@keystonejs/list-plugins');
const { AuthedRelationship } = require('@keystonejs/fields-authed-relationship');
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
    shipping:{
      type: Text,
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
    status: {
        type: Select,
        options: [
          { label: 'Pending', value: 'PENDING' },
          { label: 'Processing', value: 'PROCESSING' },
          { label: 'Delivered', value: 'DELIVERED' },
        ],
        defaultValue: 'PENDING',
        ui: {
          displayMode: 'segmented-control',
          createView: { fieldMode: 'hidden' },
        },
      },   
  },
  access: {
    create: isLoggedIn,
    read: true,
    update:   isLoggedIn,
    delete:   isLoggedIn,
  },
  plugins: [
    atTracking({
      createdAt: DateTimeUtc,
      access:{
        read: true,
        create: false,
        update: false
      }
      }),
  ],
};

module.exports = Order;
