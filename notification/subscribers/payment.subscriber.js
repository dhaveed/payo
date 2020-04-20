

const {socket} = require('axon');
const Meduim ={
   email : require('../meduim/email'),
   phone : require('../meduim/sms')
}
const sub = socket('sub');

class Subscriber{
  static pay(user){

  }

  static receive({user, meduim}){

  }
}




module.exports = (port) => {

  sub.connect(port);

  sub.on('message', function(topic, msg){
    let [undefined,method] = topic.split(':');
    if(Subscriber[method]) Subscriber[method](msg);
  })

}
