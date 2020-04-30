//An eye opener

const { socket } = require('axon')
let responder = socket('rep');

const Model = {
  User : require('../classes/users.class'),
  initiate_payment : require('../classes/initiate_payment.class'),
  business : require('../classes/business.class'),
  business_settings : require('../classes/business_settings.class')
}
 

module.exports = (port) => {
    responder.bind(port);
    responder.on('message', function(object, args, reply){
      let [model, method] = object.split(':');
      if(!Model[model] || !Model[model][method]){
        return reply({reject :  `Undefined Method '${method}'`});
      }
        Model[model][method].apply(Model[model],args)
        .then(data => {
          reply({resolve : data})
        }, err => {
          //console.warn({err})
          reply({reject : err})
        })
        .catch(err => {
          //console.error({err})
          reply({reject : err})
        })
    })
}
