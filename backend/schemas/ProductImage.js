require('dotenv').config();
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');

const { Text, Relationship, adminConfig } = require('@keystonejs/fields');

const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: process.env.CLOUDINARY_DEFAULT_FOLDER,
});

const ProductImage = {
  fields: {
    image: {
      type: CloudinaryImage,
      adapter: cloudinaryAdapter,
      label: 'Source',
    },
    altText: {
      type: Text,
    },
    product: {
      type: Relationship,
      ref: 'Product.photo',
      adminConfig: {
        listView: {
          initialColumns: ['image', 'altText', 'product'],
        },
      },
    },
  },
};

module.exports = ProductImage;
