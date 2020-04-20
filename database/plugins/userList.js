const minSelect = require('./minSelect');
const User = require('../models/user')

module.exports = (path) => function({id, limit = 30, skip = 0, }){
  return this.aggregate([
    {$match : {_id : Types.ObjectId(id)} },
    {$unwind : `$${path}`},
    {$sort : {`${path}.time`: -1}},
    {$skip: parseInt(skip) || 0},
    {$limit : parseInt(limit) || 30 },
    {$replaceRoot : {newRoot : `$${path}`}}
  ])
  .then(data => this.populate(data, {path : 'user', model : User, select : minSelect}))
}
