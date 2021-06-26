const { Text, Select, Password,Relationship , Checkbox} = require('@keystonejs/fields');
const { userIsAdmin } = require('../access');
 

const User={
    fields:{
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update:  userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  }}


  module.exports= User