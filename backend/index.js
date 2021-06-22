require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
//  const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./seed-data/index');
const ProductSchema = require('./schemas/Product');
const UserSchema = require('./schemas/User');
const ProductImage = require('./schemas/ProductImage');
const access = require('./access');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'Sando Store';
const adapterConfig = { mongoUri: `${process.env.DATABASE_URL}` };
const session = require('@keystonejs/session')

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
 
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

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
      isAccessAllowed: access.userIsAdmin,
    }),
   ],

};
