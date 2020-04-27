
const {socket} = require('axon');


module.exports = (port) => {
let requester = socket('req');
  requester.connect(port);

  let handler = {
      get(target, object, receiver) {
          return new Proxy({}, {
              get(target, method, receiver){
                  return function(...args){
                      return new Promise((resolve, reject) => {
                          try{
                              requester.send(`${object}:${method}`, args, function(reply){
                                  let fn = Object.keys(reply)[0] == 'resolve' ? resolve : reject;
                                  fn(Object.values(reply)[0]);
                              })
                          }catch(e){
                              reject(e)
                          }
                      })
                  }
              }
          });
      }
  };
  return  new Proxy({}, handler)
}
