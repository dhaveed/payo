

const {Schema, Types} = require('mongoose');
const minSelect = require('./minSelect');
const User = require('../models/user')
const returnFunc = ({nModified}) => Promise.resolve(Boolean(nModified).valueOf());

module.exports = (schema, options) => {
  schema.add({
      comments : [{
        user : {type: Schema.Types.ObjectId, ref:'User',required: true},
        comment : {type : String, required: true},
        editted : {type : Boolean, 'default' : false},
        time : {type : Date, 'default' : Date.now},
        images : [String],
        replies : [{
            user:{type: Schema.Types.ObjectId, ref:'User'},
            reply:{type: String,required: true},
            time :{type: Date,'default': Date.now},
            editted : {type : Boolean, 'default' : false},
        }]
      }]
  })

  //schema.index({'comments.comment' : 'text'});

  schema.statics.comment = function(id, {user, comment}, image){
    return this.edit({
      _id : Types.ObjectId(id)
    }, {
      $push : {
        comments : {user, comment, image}
      }
    })
  }

  schema.statics.comments = function({id, limit = 30, skip = 0}){
    return this.aggregate([
      {$match : {_id : Types.ObjectId(id)} },
      {$unwind : "$comments"},
      {$addFields : {
        replies : {$size : '$replies'}
      }},
      {$sort : {"comments.time": -1}},
      {$skip: skip},
      {$limit : limit},
      {$replaceRoot : {newRoot : '$comments'}}
    ])
    .then(comments => this.populate(comments, {path : 'user', model : User, select : minSelect}))
  }

  schema.statics.updateComment = function({id, user, commentid, comment}){
    return this.update({
      _id : Types.ObjectId(id),
      'comments._id' : Types.ObjectId(commentid),
      'comments.user' : Types.ObjectId(user)
    }, {
      $set : {
        'comments.$' : {editted : true ,comment}
      }
    })
    .then(returnFunc)
  }

  schema.statics.deleteComment = function({id, user, comment}){
    return this.update({
      _id : Types.ObjectId(id),
      'comments._id' : Types.ObjectId(comment),
      'comments.user' : Types.ObjectId(user)
    }, {
      $pull : {
        comments : {_id :  comment}
      }
    }).then(returnFunc)
  }


  schema.statics.replies = function({id, comment}){
    return this.aggregate([
      {$match : {_id : Types.ObjectId(id)} },
      {$unwind : "$comments"},
      {$match : {'comments._id' : Types.ObjectId(comment)}},
      {$replaceRoot : {newRoot : '$comments'}},
      {$unwind : "$replies"},
      {$sort : {"replies.time": -1}},
      {$skip: skip},
      {$limit : limit},
      {$replaceRoot : {newRoot : '$replies'}}
    ])
    .then(comments => this.populate(comments, {path : 'user', model : User, select : minSelect}))
  }

  schema.statics.replyComment = function({id, user, comment, reply}){
    return this.edit({
      _id : Types.ObjectId(id),
      'comments._id' : Types.ObjectId(comment),
    },{
      $push : {'comments.$.replies' : {user, reply}}
    })
  }

  schema.statics.updateReply = function({id, user, comment, reply, replyid}){
    return this.update({
      _id : Types.ObjectId(id),
      'comments._id' : Types.ObjectId(comment),
      'comments.replies._id' : Types.ObjectId(replyid),
      'comments.replies.user' : Types.ObjectId(user)
    },{
      $set : {
        'comments.$.replies.$' : {editted : true, reply}
      }
    }).then(returnFunc)
  }

  schema.statics.deleteReply = function({id, user, comment, reply}){
    return this.update({
      _id : Types.ObjectId(id),
      'comments._id' : Types.ObjectId(comment),
      'comments.replies._id' : Types.ObjectId(reply),
      'comments.replies.user' : Types.ObjectId(user)
    },{
      $pull : {'comments.$.replies.$' : {_id : reply}}
    }).then(returnFunc)
  }
}
