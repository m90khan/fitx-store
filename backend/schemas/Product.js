const {
  Text,
  Select,
  Integer,
  adminConfig,
  Relationship,
} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');

const {userIsAdmin, userIsAdminOrOwner, userOwnsItem, isLoggedIn, rules} = require('../access');


const Product = {
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
      ref: 'ProductImage.product',
      labelField: 'Source', 
      adminConfig: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    },

    status: {
      type: Select,
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',

      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    },
    price: {
      type: Integer,
      isRequired: true,
    },
    user: {
      type: Relationship,
      ref: 'User.products',
      defaultValue: ({ authentication: { item: user } }) => ({
        connect: { id: user.id},
      }),
    },
   },
   access: {
    read: true,
    update: true,
    create: isLoggedIn,
    delete: userIsAdmin,
   },
};

module.exports = Product;
