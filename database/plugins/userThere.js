
const {Types} = require('mongoose');

module.exports = (field, user) => ({
        $and : [
          ...(user ? [{
            $size : {$ifNull : [{
              $filter : {
                  input : `$${field}`,
                  as : 'li',
                  cond : {$eq : ['$$li.user', Types.ObjectId(user)]}
              }
            }, []]}
          }] : [0]),
        1]
})
