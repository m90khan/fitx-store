const { Text, Select, Password, Relationship, Checkbox } = require('@keystonejs/fields');
const {
  userIsAdmin,
  userIsAdminOrOwner,
  userOwnsItem,
  isLoggedIn,
  permissions,
} = require('../access');
const { permissionFields } = require('./Fields');
const Role = {
  fields: {
    name: { type: Text, isRequired: true },
    ...permissionFields,
    assignedTo: {
      type: Relationship,
      ref: 'User.role',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    },
  },
  access: {
    create: userIsAdmin,
    read: userIsAdmin,
    update: userIsAdmin,
    delete: userIsAdmin
  },
};

module.exports = Role;
