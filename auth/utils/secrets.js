
const jwt = require('jsonwebtoken');

module.exports = class authSecrets{
  static get keys(){
    return {
      hash : 'TR@D3EX9L0R3R',
      reset : 'TG@@rktfbermgs(@@)@@'
    }
  }

  static encrypt(payload, key, options = {}){
    return new Promise((resolve, reject) => {
      resolve(jwt.sign(payload, this.keys[key], options))
    })
  }

  static decrypt(payload, key){
    // console.log(payload + "and " + key)
    return new Promise((resolve, reject) => {
      jwt.verify(payload, authSecrets.keys[key], function(err, decoded){
        if(err) return reject(err)
        console.log(decoded)
        resolve(decoded)
      })
    })
  }
}
