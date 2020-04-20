

const {socket}  = require('axon');

const pub = socket('pub');

//port here is for testing
//change to actual port in docs
pub.bind(3235);
pub.set('identity', 'User Publisher');

module.exports = class Pub{
  static gang({user, ganger}){
    pub.send('user:gang', {user, ganger});
  }

  static delete(user){
    pub.send('user:delete', user);
  }

  static update(data){
    pub.send('user:update', data);
  }

  static passwordChange(user){
    pub.send('user:passwordChange', user)
  }
};
