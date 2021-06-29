const { Checkbox } = require('@keystonejs/fields');

const permissionFields = {
    canManageProducts: {
        type: Checkbox, 
      defaultValue: false,
      label: 'User can UPDATE and DELETE any PRODUCT',
    },
    canSeeOtherUsers:{
        type: Checkbox, 
      defaultValue: false,
       label: 'User can QUERY other USERS',
    },
     
    canManageUsers: {
        type: Checkbox, 
      defaultValue: false,
      label: 'User can EDIT other USERS',
     },
       canManageRoles:  {
        type: Checkbox, 
      defaultValue: false,
      label: 'User can MANAGE/CRUD USER ROLES',
     },
     canManageCart:{
        type: Checkbox, 
      defaultValue: false,
      label: 'User can MANAGE CART and its ITEMS',
     },
     canManageOrders: {
        type: Checkbox, 
      defaultValue: false,
      label: 'User can MANAGE ORDERS',
     },
   };
  
   
  const permissionsList  = Object.keys(
    permissionFields
  ) 
  

  module.exports={permissionFields , permissionsList}