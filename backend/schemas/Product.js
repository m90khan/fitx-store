const {
  Text,
  Select,
  Integer,
  adminConfig,
  Relationship,
  DateTimeUtc,
} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { createdAt, updatedAt, format,atTracking   } = require('@keystonejs/list-plugins');
const { AuthedRelationship } = require('@keystonejs/fields-authed-relationship');

const {
  userIsAdmin,
  userIsAdminOrOwner,
  userOwnsItem,
  isLoggedIn,
  rules,
} = require('../access');

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
    gallery: {
      type: Relationship,
      ref: 'ProductImage',
      labelField: 'Gallery',
      many:true,
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
      type: AuthedRelationship,
      ref: 'User.products',
       //  defaultValue: ({ authentication: { item: user } }) => ( {connect: { id: user.id }}),
       access:{
         create: isLoggedIn,
         read: true,
         update: isLoggedIn,
         delete: isLoggedIn
       }
    },
  },
  access: {
    create: isLoggedIn,
    read: true,
    update: userOwnsItem,
    delete: userIsAdmin,
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

module.exports = Product;
