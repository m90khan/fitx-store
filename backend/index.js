require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./seed-data/index');
const Product = require('./schemas/Product');
const User = require('./schemas/User');
const ProductImage = require('./schemas/ProductImage');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { userIsAdmin, userIsAdminOrOwner, isLoggedIn } = require('./access');
const { customSchemasMutations } = require('./mutations');
const Order = require('./schemas/Order');
const OrderItem = require('./schemas/OrderItem');
const Role = require('./schemas/Role');
const CartItem = require('./schemas/CartItem');
const { ForgottenPasswordToken, customSchema } = require('./schemas/PasswordReset');

const PROJECT_NAME = 'Sando Store';
const adapterConfig = { mongoUri: `${process.env.DATABASE_URL}` };
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
  fields: Product.fields,
  labelField: 'name',
  access: Product.access,
  plugins: Product.plugins
});

keystone.createList('ProductImage', {
  fields: ProductImage.fields,
  access: ProductImage.access,
});

keystone.createList('User', {
  fields: User.fields,
  // List-level access controls
  access: User.access,
  hooks: User.hooks,
});
keystone.createList('CartItem', {
  fields: CartItem.fields,
  // List-level access controls
  access: CartItem.access,
});
keystone.createList('OrderItem', {
  fields: OrderItem.fields,
  // List-level access controls
  access: OrderItem.access,
});
keystone.createList('Order', {
  fields: Order.fields,
  // List-level access controls
  access: Order.access,
});
keystone.createList('Role', {
  fields: Role.fields,
  // List-level access controls
  access: Role.access
});
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
keystone.extendGraphQLSchema(customSchemasMutations);
// keystone.extendGraphQLSchema(customSchema);

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
      isAccessAllowed: isLoggedIn
    }),
  ],
};
