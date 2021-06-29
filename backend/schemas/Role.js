const { Text, Select, Password, Relationship, Checkbox } = require('@keystonejs/fields');
const {userIsAdmin, userIsAdminOrOwner, userOwnsItem, isLoggedIn} = require('../access');
 
const Role = {
  fields: {
    name: { type: Text ,       isRequired: true,
    },
    assignedTo: {
        type: Relationship,
        ref: 'User.role',
        many: true,
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      },
    }
  
};

module.exports = Role;
