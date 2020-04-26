

const {socket}  = require('axon');

const pub = socket('pub');

//port here is for testing
//change to actual port in docs
pub.bind(3233);
pub.set('identity', 'Authentication Publisher');

module.exports = class Pub{
  static login({user, login}){
    pub.send('auth:login', {user, login});
  }

  static signup(user){
    pub.send('auth:signup', user);
  }

  static verifyCode(data){
    console.log(data);
    pub.send('auth:verifycode', data);
  }

  static resetcode(data){
    pub.send('auth:resetcode', data)
  }
};
