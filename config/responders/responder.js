
const { socket } = require('axon')
let responder = socket('rep');

const Model = {
  Exchange : require('../controllers/exchange')
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
          console.warn({err})
          reply({reject : err})
        })
        .catch(err => {
          console.error({err})
          reply({reject : err})
        })
    })
}
