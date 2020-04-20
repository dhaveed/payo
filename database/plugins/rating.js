const {Schema, Types} = require('mongoose')

let pathify = (path, key) => `${path ? path+'.' : ''}${key}`;

module.exports = (schema, options)=>{

  schema.add({ratings : [{
        user : {type: Schema.Types.ObjectId,ref:'User',required: true},
        rating : {type : Number, max: 5, min : 0, required :true},
        review : {type : String},
        time : {type : Date, 'default' : Date.now}
  }]})

  schema.statics.rate = function({id, user, rating, review}){
    return this.edit({
      _id : Types.ObjectId(id),
      'ratings.user' : {$ne : Types.ObjectId(user)}
    },{
      $push : {
        'ratings' : {user, rating, review}
      }
    })
  }

  schema.statics.ratings = function({id, skip, limit}){
    return this.aggregate([
      {$match : {_id : Types.ObjectId(id)}},
      {$unwind : '$ratings'},
      {$skip: parseInt(skip) || 0},
      {$limit : parseInt(limit) || 30},
      {$replaceRoot : {newRoot : '$ratings'}}
    ])
  }

  schema.statics.updateRating = function({id, user, rating, review, path = null}){
      return this.edit({
          _id : Types.ObjectId(id),
          'ratings.user' : Types.ObjectId(user)
        }, {$set : {'ratings.$' : {rating, review}}
      })
  }

  schema.statics.deleteRating = function({id, user, path = null}){
    return this.edit({
        _id : Types.ObjectId(id),
        'ratings.user' : Types.ObjectId(user)
      }, {$pull : {'ratings' : {user : Types.ObjectId(user)}}
    })
  }

}
