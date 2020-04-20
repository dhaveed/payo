

const {socket} = require('axon');
const Meduim ={
   email : require('../meduim/email'),
   phone : require('../meduim/sms')
}
const sub = socket('sub');

class Subscriber{
  static signup(user){
    Meduim.email.auth.signup(user)
    .then(console.log, console.log)
    .catch(console.log)
  }

  static verifycode({user, meduim}){
    Meduim[meduim].auth.verifycode(user)
    .then(console.log, console.log)
    .catch(console.log)
  }

  static resetcode({user, token}){
    Meduim.email.auth.resetpassword(user, token)
    //.then(console.log, console.log)
    //.catch(console.log)
  }
}




module.exports = (port) => {

  sub.connect(port);

  sub.on('message', function(topic, msg){
    let [undefined,method] = topic.split(':');
    if(Subscriber[method]) Subscriber[method](msg);
  })

}
