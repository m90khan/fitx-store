require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./seed-data/index');
const ProductSchema = require('./schemas/Product');
const UserSchema = require('./schemas/User');
const ProductImage = require('./schemas/ProductImage');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'Sando Store';
const adapterConfig = { mongoUri: `${process.env.DATABASE_URL}` };
const { ForgottenPasswordToken, customSchema } = require('./schemas/PasswordReset');
const { userIsAdmin, userIsAdminOrOwner } = require('./access');
const { sendEmail } = require('./emails');
const CartItem = require('./schemas/CartItem');
const { customCartSchema } = require('./mutations');
const Order = require('./schemas/Order');
const OrderItem = require('./schemas/OrderItem');

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
  access: UserSchema.access,
  hooks: UserSchema.hooks,
});
keystone.createList('CartItem', {
  fields: CartItem.fields,
  // List-level access controls
  access: CartItem.access,
});
keystone.createList('OrderItem', {
  fields: OrderItem.fields,
  // List-level access controls
});
keystone.createList('Order', {
  fields: Order.fields,
  // List-level access controls
});
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
keystone.extendGraphQLSchema(customCartSchema);
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
