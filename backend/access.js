 const { permissionsList } = require("./schemas/Fields");



 const isLoggedIn = ({ authentication: { item: user } }) => {
  getUser({ itemId: user.id })

      return !!user
  }
   // Access control functions
  const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin)
  
  const userOwnsItem = ({ authentication: { item: user } }) => {
    if (!user) {
      return false;
    }
     // Instead of a boolean, you can return a GraphQL query:
    // https://www.keystonejs.com/api/access-control#graphqlwhere
    return { id: user.id };
  };
  
  const userIsAdminOrOwner = auth => {
    console.log(auth)
    const isAdmin = userIsAdmin(auth);
    const isOwner = userOwnsItem(auth);
    return isAdmin ? isAdmin : isOwner;
  };


  const generatedPermissions = Object.fromEntries(
    permissionsList.map((permission) => [
      permission,
      function ({ authentication: { item: user } }) {
        return !!user?.role?.[permission];
      },
    ])
  );
const permissions = {
  ...generatedPermissions,
  morePermission({ authentication: { item: user } }) {
    return user?.name.includes('Khan');
  },
};
  const  rules = {
    canManageProducts() {
      if (!isLoggedIn()) {
        return false;
      }
      // 1. Do they have the permission of canManageProducts
      if (permissions.canManageProducts({ authentication: { item: user } })) {
        return true;
      }
      // 2. If not, do they own this item?
      return userOwnsItem();
    },
    canOrder() {
      if (!isLoggedIn()) {
        return false;
      }
      // 1. Do they have the permission of canManageProducts
      if (permissions.canManageCart({ authentication: { item: user } })) {
        return true;
      }
      // 2. If not, do they own this item?
      return userOwnsItem();
    },
    canManageOrderItems() {
      if (!isLoggedIn()) {
        return false;
      }
      // 1. Do they have the permission of canManageProducts
      if (permissions.canManageCart({ authentication: { item: user } })) {
        return true;
      }
      // 2. If not, do they own this item?
      return userOwnsItem();
    },
    canReadProducts() {
      if (!isLoggedIn()) {
        return false;
      }
      if (permissions.canManageProducts({ authentication: { item: user } })) {
        return true; // They can read everything!
      }
      // They should only see available products (based on the status field)
      return { status: 'AVAILABLE' };
    },
    canManageUsers() {
      if (!isLoggedIn()) {
        return false;
      }
      if (permissions.canManageUsers({ authentication: { item: user } })) {
        return true;
      }
      // Otherwise they may only update themselves!
      return userOwnsItem();
    },
  };
  
 



 
  module.exports={userIsAdmin, userIsAdminOrOwner, userOwnsItem, isLoggedIn , rules, permissions}