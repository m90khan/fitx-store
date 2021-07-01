const { permissionsList } = require('./schemas/Fields');
const { createItem, getItem } = require('@keystonejs/server-side-graphql-client');
const getUser =   async({itemId , context}) => {
  const user = await getItem({
    context,
    listKey: 'User',
    itemId,
    returnFields: 'id, name role',
  });
 return user // User 123: { id: '123', name: 'Aman' }
} 
const isLoggedIn = ({ authentication: { item: user } }) => !!user;

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);

const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = (auth) => {
  const admin = access.isAdmin(auth);
  const owner = access.isOwner(auth);

  return admin ? admin : owner;
};

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    async function ({ authentication: { item: user } , context}) {
      const currentUser = context?.authedItem;
      if(context) {
        const { errors, data } = await context.executeGraphQL({
          context: context.createContext({ skipAccessControl: true }),
          query: `
          query{
            authenticatedUser{
              id
              email
              role{
                canManageProducts
                canSeeOtherUsers
                canManageOrders
                canManageRoles
                canManageUsers
                canManageCart
              }
            }
          }` ,
         
        });
        const User =  JSON.parse(JSON.stringify(data.authenticatedUser));
       
        return !!User?.role?.[permission];
      }  
    },
  ])
);
const permissions = {
  ...generatedPermissions,
  // morePermission({ authentication: { item: user } }) {
  //   return user?.name.includes('Khan');
  // },
};
const rules = {
  canManageProducts({ authentication: { item: user } }) {
    if (!isLoggedIn({ authentication: { item: user } })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ authentication: { item: user } })) {
      return true;
    }
    // 2. If not, do they own this item?
    return userIsAdminOrOwner({ authentication: { item: user } });
  },
  canOrder() {
    if (!isLoggedIn({ authentication: { item: user } })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ authentication: { item: user } })) {
      return true;
    }
    // 2. If not, do they own this item?
    return  userOwnsItem({ authentication: { item: user } })
  },
  canManageOrderItems({ authentication: { item: user } }) {
    if (!isLoggedIn({ authentication: { item: user } })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ authentication: { item: user } })) {
      return true;
    }
    // 2. If not, do they own this item?
    return  userIsAdminOrOwner({ authentication: { item: user } })
  },
  canReadProducts({ authentication: { item: user } }) {

    if (permissions.canManageProducts({ authentication: { item: user } })) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ authentication: { item: user } }) {
    if (!isLoggedIn({ authentication: { item: user } })) {
      return false;
    }
    if (permissions.canManageUsers({ authentication: { item: user } })) {
      return true;
    }
    // Otherwise they may only update themselves!
    return  userIsAdminOrOwner({ authentication: { item: user } })
  },
};

module.exports = {
  userIsAdmin,
  userIsAdminOrOwner,
  userOwnsItem,
  isLoggedIn,
  rules,
  permissions,
};
