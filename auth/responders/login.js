/*
  decrypt token
  lookup in login table
  compare device
  send complete use details
*/
const {socket} = require('axon');
const res = socket('rep');
const $u = require('../requesters/database.user');
const {encrypt, decrypt} = require('../utils/secrets');
//testing port, change later

class loginResponder{

  static complete(email){
    // console.log("i got to complete");
    return $u.User.fetchOne({"where": {"email" : email}})
  } 

  static decrypt(token){
    return decrypt(token, 'hash')
  }

  static lookup(login){
    // console.log("got to look up check")
    return $u.User.valid(login)
  }

  static compare(headers, login){
    // console.log(headers['user-agent'] + "i got to comparition");
    // console.log(login.headers + "this is login from comparition")
    return new Promise((resolve, reject) => {
      if(!headers['user-agent']){
        return reject(null)
      }
      resolve(login);
    })
  }

  static check(token, headers){
    // console.log("i got to check")
    return new Promise((resolve, reject) =>{
      this.decrypt(token)
      .then(({login}) => this.lookup(login), reject)
      .then(login => this.compare(headers, login) , reject)
      .then(({email}) => this.complete(email), reject)
      .then(resolve,reject)
      .catch(reject)
    })
  }

  static isSelf(){

  }
}

module.exports = (port) => {

  res.bind(port);

  res.on('message', function(method, args, reply){
    if(loginResponder[method]){
      loginResponder[method].apply(loginResponder, args)
      .then(data => reply({resolve : data}), err => reply({reject : err}))
      .catch(err => reply({reject : err}))
    }else{
      reply({reject : `${method} is not a defined method`})
    }
  })
}
