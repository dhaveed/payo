
const criteria = (user) => ({$cond : [{$or : [{$in : [user, {$setUnion : ["$students","$tailors"]}]},{$eq : ["$amount", 0]}]},true, false]})
const Sequelize = require("sequelize");
const pdb = require('../models').products;
const cart = require('../models').categories;
const rate = require('../models').ratings;
const Login = require('./response');
const comments = require('../models').comments;
const subscribers = require('../models').subscribers;
const reports = require('../models').reports;
const wishlist = require('../models').wishlist;
const carts = require('../models').carts;
const icon = require('../models').icons;
const Op = Sequelize.Op;


module.exports = class productClass extends Sequelize.Model{
    static getById({id, login, ...query}){
      return pdb.findOne({where: {id: id}})
    }    

    static catById({id, login, ...query}){
      return cart.findOne({where: {id: id}})
    }

    // static addToCarts(body){
    //   return carts.create(body);
    // }

    static isIdUnique (body) {
      return carts.count({ where: { "uid": body.uid, "pid":body.pid, "cid":body.cid } })
        .then(count => {
          if (count != 0) {
            return false;
          }
          return true;
      });
    }


    static addToCarts(body){
      return new Promise((resolve, reject) =>{
        this.isIdUnique(body).then(isUnique => {
            if(isUnique){
              return new Promise((resolve, reject) => {
                  return Promise.all([
                    carts.create(body),
                    Login.pass(body)
                  ])
                .then(resolve, reject)
                .catch(reject =>  console.log("i dont like it here -1"))
              })
            }else{
              return reject({message : 'Product already in Cart'})
              // return "user Already exist";
            }
        },reject).then(resolve, reject).catch(reject =>{ console.log("i dont like it here 2")});
      })
    }

    static fetchFromCarts(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          carts.findAll({ 
            where: query,
            include: ['productsinfo']
          })
        ]).then(([carts])  => {
            return Promise.all([
                resolve(carts)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static updateCart(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          carts.findOne({where: {"id": query.id}})
        ]).then(([data]) => {
          data.update(query);
          return data.save();
        }, reject)
        .then(resolve, reject)
        .catch(reject)
      })
    }

    static deleteOneFromCart(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          carts.destroy({
            where: {id: query.id}
          })
        ]).then(([deletedRecord])  => {
            return Promise.all([
                resolve(deletedRecord)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static dashboardProductinfo({uid}){
        return pdb.findAll({where: {uid: uid}})
    }

    static getcommentById({id, login, ...query}){
      return comments.findOne({where: {id: id}})
    }

    static reportProduct(body){
      return reports.create(body);
    }

    static wishlistProduct(body){
      return wishlist.create(body);
    }

    static getwishlist(){
       return new Promise((resolve, reject) => {
        Promise.all([
          carts.findAll({ 
            wishlist: query,
          })
        ]).then(([list])  => {
            return Promise.all([
                resolve(list)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }


    static getcommentForProduct(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          comments.findAll({ 
            where: query,
            attributes: ['id','user','pid','comment','time','createdAt'],
            raw: true
          })
        ]).then(([products])  => {
            return Promise.all([
                resolve(products)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static getMany({id, login, ...query}){
      return pdb.findOne({where: {id: id}})
    }

    static getOne(query){
      return pdb.get({...query, limit : 1}).then(([classDetails]) => Promise.resolve(classDetails))
    }


    static get(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          pdb.findAll({ 
            where: query,
            attributes: ['id','cid','uid','name','photos','videos','region','amount','currency','coverPhoto','creator','coverVideo','price','negotiable','subcategory','paymentype','adtype','category','featured','tradexplorer','views','approved','published','deleted','description','keywords','popular','special','canExchange','checkFields','inputFields','createdAt'],
            raw: true,
          })
        ]).then(([products])  => {
            return Promise.all([
                resolve(products)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static getHotSellers(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          subscribers.findAll({ 
            where: query,
            attributes: ['id','uid','pid','package','avatar','name','location','price','createdAt']
          })
        ]).then(([hoty])  => {
            return Promise.all([
                resolve(hoty)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }


    static pcategories(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          cart.findAll({ 
            where: query,
            attributes: ['id','name','parent','icon','checkFields','inputFields','deleted','createdAt']
          })
        ]).then(([categoriess])  => {
            return Promise.all([
                resolve(categoriess)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

   static picon(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          icon.findAll({ 
            where: query,
            attributes: ['id','name','fontimg','deleted','createdAt']
          })
        ]).then(([categoriess])  => {
            return Promise.all([
                resolve(categoriess)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static iconById(query){
      return icon.findOne({where: query})
    }

    static rsearch(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          pdb.findAll({ 
            where:  {
              "deleted" : 0,
              [Op.or] : [{
                "name": { [Op.like]: '%' +query + '%' },
                "description": { [Op.like]: '%' +query + '%' },
              }]
            }
          })
        ]).then(([searchResult])  => {
            return Promise.all([
                resolve(searchResult)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static comparition(body){
      return new Promise((resolve, reject) => {
        Promise.all([
          pdb.findAll({ 
            where: {
              "cid": body.cid,
              "deleted" : 0,
              [Op.or] : [{
                "name": { [Op.like]: '%' +body.name + '%' },
                "description": { [Op.like]: '%' +body.name + '%' },
              }]
            }
          })
        ]).then(([searchResult])  => {
            return Promise.all([
                resolve(searchResult)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }


    static subcategories(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          cart.findAll({ 
            where: query,
            attributes: ['id','name','parent','icon','deleted','createdAt']
          })
        ]).then(([categoriess])  => {
            return Promise.all([
                resolve(categoriess)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

    static countView({id, user, objective}){
        //if on web  dont count
    }

    static removeStudent({id, user}){
      return this.edit({
        _id : Types.ObjectId(id)
      },{$push : {students : {user}}})
    }

    static students({id, skip, limit}){
      return this.aggregate([
        {$match : {_id : Types.ObjectId(id)} },
        {$unwind : `$students`},
        //{$sort : {`$students.time`: -1}}, //fix later, sort students by descending order
        {$skip: parseInt(skip) || 0},
        {$limit : parseInt(limit) || 30 },
        {$replaceRoot : {newRoot : `$students`}}
      ])
    }


  static editClass({id, user, objective, ...query}, body){
    return pdb.findOne({where:{id: id, login:user, published:true}})
          .then(function(users){
           })
  }

  static editProduct({id, user, objective, ...query}, body){
    return pdb.findOne({id : id}).then(usr => {
      usr.update(body);
      return usr.save();
    })
  }

  static deleteOne(query){
    return new Promise((resolve, reject) =>{
      pdb.findOne({"where":query})
          .then(user=>{
              user.update({"deleted":true});
              return user.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }

  static createObjective({id, user, name}){
    name = Array.isArray(name) ? name : [name];
    console.log(name.map(n => ({name : n, creator : user})));
    return this.getOneAndEdit({_id : Types.ObjectId(id), login : user, unpublished : true},{
      _id : Types.ObjectId(id),
      $or : [
        {creator : Types.ObjectId(user)},
        {tailors : Types.ObjectId(user)}
      ]
    },{$push : {objectives :{$each :  name.map(n => ({name : n, creator : user})) } }})
  }

  static deleteObjective({id, user, objective}){
    return this.update({
      _id : Types.ObjectId(id),
      $or : [
        {creator : Types.ObjectId(user)},
        {tailors : Types.ObjectId(user)}
      ],
      'objectives._id' : Types.ObjectId(objective)
    },{$pull : {objectives : {_id : objective } } })
    .then(({nModified}) => Boolean(nModified).valueOf())
  }

  static editObjective({id, user, objective, creator, name, description}){
    return this.update({
      _id : id,
      $or : [
        {creator : Types.ObjectId(user)},
        {tailors : Types.ObjectId(user)}
      ],
      'objectives._id' : Types.ObjectId(objective)
    }, {$set : {'objectives.$' : {name, description, creator}} })
    .then(({nModified}) => !!nModified)
  }

  static mergeClasses({id, newClass, user}){
    return this.findOne({
      _id : id,
      $or : [
        {creator : user},
        {tailors : user}
      ]
    })
    .then(classDetails => {
      return this.edit({
        _id : Types.ObjectId(newClass),
        $or : [
          {creator : Types.ObjectId(user)},
          {tailors : Types.ObjectId(user)}
        ]
      },{
        $push : {objectives : {$each : classDetails.objectives}}
      })
    })
  }

  static moveObjective({id, objective, newClass, user}){
    return this.findOne({
      _id : id,
      'objectives._id' : objective,
      $or : [
        {creator : Types.ObjectId(user)},
        {tailors : Types.ObjectId(user)}
      ]
    },{objectives : 'objectives.$'})
    .then(classB => {
      return this.edit({
        _id : Types.ObjectId(newClass),
        $or : [
          {creator : Types.ObjectId(user)},
          {tailors : Types.ObjectId(user)}
        ]
      },{
        $push : {objectives : {$each : classB.objectives}}
      })
    })
  }

  static mergeObjectives({id, objective, newObjective, newClass, user}){
    return this.findOne({
      _id : id,
      'objectives._id' : objective,
      $or : [
        {creator : Types.ObjectId(user)},
        {tailors : Types.ObjectId(user)}
      ]
    },{objectives : 'objectives.$'})
    .then(classB => {
      return this.edit({
        _id : Types.ObjectId(newClass),
        'objectives._id' : Types.ObjectId(newObjective),
        $or : [
          {creator : Types.ObjectId(user)},
          {tailors : Types.ObjectId(user)}
        ]
      },{
        $push : {'objectives.$.contents' : {$each : classB.objectives[0].contents}}
      })
    })
  }

  static moveContent({id, objective, content, newClass, newObjective, user}){
    return this.findOne({
      _id : id,
      'objectives._id' : objective,
      'objectives.content._id' : content,
      $or : [
        {creator : user},
        {tailors : user}
      ]
    },{objectives : 'objectives.$'})
    .then(classB => {
      return this.edit({
        _id : Types.ObjectId(newClass),
        'objectives._id' : Types.ObjectId(newObjective),
        $or : [
          {creator : Types.ObjectId(user)},
          {tailors : Types.ObjectId(user)}
        ]
      },{
        $push : {'objectives.$.contents' : content}
      })
    })
  }

  static async verifyUser({user, ...query}){
    //get the sub for user here
    //show permission : [tailor, student]
    // let sub = Subscription.active(user);
    return new Promise((resolve, reject) => {
      this.findOne({
        $or : [
          // {$expr : {
          //   $and : ["$tailorang", {$ne : [null, sub]}]
          // }},
          {creator : user},
          {tailors : user},
          {'students.user' : user},
          {"amount" : 0}], ...query},{'objectives.$' : 1})
      .then(info => info ? resolve(info) : reject(info), reject)
      .catch(reject)
    })
  }


  static addKeyword({$class, user, keyword}){
    return new Promise((resolve, reject) =>{
      pdb.findOne({"where":{"id": id}, attributes: ['keywords']})
          .then(list=>{
              keyword.forEach(function(item) {
                  list.push(item);
              });
              list.update({"keywords":keywords});
              return list.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }
  
  static removeKeyword({$class, user, keyword}){
    return new Promise((resolve, reject) =>{
      pdb.findOne({"where":{"id": id}, attributes: ['keywords']})
          .then(list=>{
              list.filter(e => e !== keyword);
              list.update({"keywords":keywords});
              return list.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }

  static rate({id, user, rating, review}){
    return rate.create({
      "user":user,
      "proid":id,
      "rating":ratings,
      "review":review
    });
  }

  static create(body){
    return pdb.create(body);
  }

  static ratings({id}){
    return rate.findAndCountAll({
      where:{
        "proid":id
      }
    });
  }

  static updateRating({id, user, rating, review, path = null}){
      return new Promise((resolve, reject) =>{
      ratings.findOne({"where":{"proid":id}})
          .then(user=>{
              user.update({"rating":rating});
              return user.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }

  static deleteRating({id, user, path = null}){
    return new Promise((resolve, reject) =>{
      ratings.findOne({"where":{"proid":id}})
          .then(user=>{
              user.update({"deleted":true});
              return user.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }

  static comment(id, {user, comment}, image){
    return this.edit({
      _id : Types.ObjectId(id)
    }, {
      $push : {
        comments : {user, comment, image}
      }
    })
  }

  static comments({id, limit = 30, skip = 0}){
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

  static allComments(query){
      return new Promise((resolve, reject) => {
        Promise.all([
          comments.findAll({ 
            where: query,
            attributes: ['id','user','pid','comment','time','createdAt']
          })
        ]).then(([products])  => {
            return Promise.all([
                resolve(products)   
            ])
        }, reject).then(resolve, reject)
        .catch(reject)
      })
    }

  static updateComment({id, user, commentid, comment}){
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

  static deleteComment({id, user, comment}){
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


  static replies({id, comment}){
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

  static replyComment({id, user, comment, reply}){
    return this.edit({
      _id : Types.ObjectId(id),
      'comments._id' : Types.ObjectId(comment),
    },{
      $push : {'comments.$.replies' : {user, reply}}
    })
  }

  static updateReply({id, user, comment, reply, replyid}){
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

  static deleteReply({id, user, comment, reply}){
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
