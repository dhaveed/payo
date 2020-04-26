
const Login = require('./response');
const Sequelize = require("sequelize");
const raw = require('../models');
const db = require('../models').users;


 
const bioString =  (val) => {
    let bios = [
      {"info3" : ["fullname" , `Adeojo Emmanuel imm,  professor backend dev`]}
    ]
    return bios[val]
}

 

module.exports = class userModelClass extends Sequelize.Model {
  static getById({id, login, ...query}){
      return db.findOne({where: {id: id}})
  }
 
	static updateEmail(email){
		return new Promise((resolve, reject) => {
		  Promise.all([
			  db.findOne({where: {"email": email}})
		  ]).then(([users]) => {
			  user.update({"password":password});
        return user.save();
		  }, reject)
		  .then(resolve, reject)
		  .catch(reject)
		})
	}


  static async userpics(id, picname){
    return new Promise((resolve, reject) =>{
      db.findOne({"where":{"id" : id}})
      .then(user=>{
        if(user){
          user.update({"pictureUrl":picname});
          return user.save();
        }
        return Promise.reject({id : 'User not found'})
      },reject)
      .then(resolve, reject)
      .catch(reject)
    })
  }


  static find(){
    return db.findAll();
  }

  static findOne(query){
    db.findOne({ "where": query });
  }

  static isrefIdUnique (id) {
    return db.count({ where: { "referalId": id } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
  }


  static referalId(id){
    this.isrefIdUnique(id).then(isUnique => {
        if (isUnique) {
            return id;
        }
        this.referalId();
    });
  }

  static login({email, password, location,headers, as, deviceId, token, ip}){
    console.log(password);
    return new Promise((resolve, reject) => {
      Promise.all([
        db.findOne({ where: { "email": email } })
      ]).then(([user])  => {
        console.log(user.password)
        if(!user){
          return Promise.all([
            Login.fail({email, headers, challenge : 'email', ip}),
            reject({'message' : 'incorrect email'})
          ])
        }else if(user && !user.activation){
            return Promise.all([
                Login.fail({email, headers, challenge : 'auth', ip}),
                reject({'message' : 'Account with this email has not been verified'})
            ])
        }else if(user && (as != 'user' && user[as])){
          return Promise.all([
              Login.fail({email, headers, challenge : 'auth', ip}),
              reject({'message' : `Account with this email is not an active ${as}`})
          ])
        }else if (user && user.password != password) {
          return Promise.all([
            Login.fail({email, headers, challenge : 'password', ip}),
            reject({'message' : 'incorrect password'})
          ])
        }else{
          return Promise.all([
            Login.pass(Object.assign({email, headers, ip}, deviceId && {deviceId}, token && {token})),
            user.save()
          ])
          // return user.save();
        }
      }, reject).then(resolve, reject)
      .catch(reject)
    })
  }



  static valid(id){
    return new Promise((resolve, reject) => {
      db.findOne({"where": {"id" : id}})
      .then(login => login ? resolve(login) : reject(login), reject)
      .catch(reject)
    })
  }


  static signup({email, headers, ip, phone, rcountry, ...body}){
    return new Promise((resolve, reject) =>{
      this.isIdUnique(email).then(isUnique => {
          if(isUnique){
            return new Promise((resolve, reject) => {
                 console.log(Object.assign({email,rcountry, phone}, body))  
                return Promise.all([
                  db.create(Object.assign({email,rcountry, phone}, body)),
                  Login.pass(Object.assign({email, headers, ip}, body.deviceId && {deviceId :  body.deviceId}, body.token && {token : body.token}))
                ])
              .then(resolve, reject)
              .catch(reject =>  console.log("i dont like it here -1"))
            })
          }else{
            return reject({message : 'user Already exist'})
            // return "user Already exist";
          }
      },reject).then(resolve, reject).catch(reject =>{ console.log("i dont like it here 2")});
    })
  }

  static isIdUnique (email) {
    return db.count({ where: { "email": email } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
  }

  static exist(whr){
    return new Promise((resolve, reject)=>{
      this.findAll({
        limit: 1,
        where: whr,
        order: [ [ 'createdAt', 'DESC' ]]
      }).then(user => {
        if(!user) return reject(user)
        resolve(user)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  static testConnection(data){
    return data;
  }

  static sendMail(to,from,subject,text,html){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    sgMail.send(msg);
  } 

  static resetPassword(query, password){
    return new Promise((resolve, reject) =>{
      db.findOne({"where":query})
          .then(user=>{
              user.update({"password":password});
              return user.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }

  static verification(user, body){
    //return this.findOneAndUpdate(user,{
      console.log(user)
      console.log(body)
      return new Promise((resolve, reject) =>{
        return db.findOne({"where":{"email" : user.email}})
          .then(user=>{
            if(user){
              user.update({"status":body.status});
              return user.save();
            }
            return Promise.reject({number : 'incorrect verification number entered'})
          },reject)
          .then(resolve, reject)
          .catch(reject)
       })
  }

  static findOneOrFail(query){
    return db.findOne({"where":query})
            .then(user => user ? Promise.resolve(user) : Promise.reject(user), Promise.reject)
            .catch(Promise.reject)
  }  

  static findOneAndRemove(query){
    return db.findOne({"where":query})
        .then(user=>{
        if(user){
          user.update({"deleted":true});
          return user.save();
        }
        return Promise.reject({error : 'error deleting user'})
      },reject)
    .catch(Promise.reject)
  }
 

  static async verify(user, number){
    return new Promise((resolve, reject) =>{
      db.findOne({"where":{"email" : user}})
      .then(user=>{
        if(user && user.status == number){
          user.update({"activation":true});
          return user.save();
        }
        return Promise.reject({number : 'incorrect verification number entered'})
      },reject)
      .then(resolve, reject)
      .catch(reject)
    })
  }


  static fetchOne(query){
    return new Promise((resolve, reject) => {
      db.findOne(query)
      .then(user => resolve(user))
      .catch(reject)
    })
  }

  static getOne(query){
      return db.findOne(query).then(([user]) => Promise.resolve(user || null))
  }


  static updateToken({token, login}){
    return Login.findOneAndUpdate({id : login}, {"token" : token})
  }


  static updateUser(user, body){
    return new Promise((resolve, reject) =>{
      db.findOne({"where":{"id": user}})
          .then(user=>{
              user.update(body);
              return user.save();
          },reject)
          .then(resolve, reject)
          .catch(reject)
    })
  }


  static changePassword({password, newPassword, id}){
        return new Promise((resolve, reject) => {
      Promise.all([
        db.findOne({ where: {"id": id} })
      ]).then(([user])  => {
        if(!user) return reject(user)
        if(user && !user.password != password)  return reject({password : 'password incorrect'})
        user.set({password : newPassword});
        return user.save()
      }, reject).then(resolve, reject)
      .catch(reject)
    })
  }	
}
