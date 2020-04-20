
const {Schema, Types} = require('mongoose');
const User = require('../models/user');
const likesSchema = require('../models/user_time.schema');
const minSelect = require('./minSelect');

module.exports = (schema, options) => {
    schema.add({
      likes : [likesSchema]
    })

    schema.statics.like = function({id, user, login}){
      return this.getOneAndEdit(
        {_id : Types.ObjectId(id), login},
        {_id : Types.ObjectId(id), 'likes.user' : {$ne : Types.ObjectId(user)}},
        {$push : { likes : {user} }
      })
    }

    schema.statics.unlike = function({id, user, login}){
      return this.getOneAndEdit(
        {_id : Types.ObjectId(id), login},
        {_id : Types.ObjectId(id), 'likes.user' : Types.ObjectId(user)},
        {$pull : { likes : {user} }
      })
    }

    schema.statics.likes = function({id, skip, limit}){
      return this.aggregate([
        {$match : {_id : Types.ObjectId(id)} },
        {$unwind : "$likes"},
        {$sort : {"likes.time": -1}},
        {$skip: skip},
        {$limit : limit},
        {$replaceRoot : {newRoot : '$likes'}}
      ])
      .then(comments => this.populate(comments, {path : 'user', model : User, select : minSelect}))
    }
}
