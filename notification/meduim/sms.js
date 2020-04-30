

const axios = require('axios');
const templates = {
  verification : require('../templates/sms/auth/verification'),
  signup : require('../templates/sms/auth/signup'),
  resetpassword : require('../templates/sms/auth/resetpassword')
}

module.exports = class SMS{
  static send({to, message, from = 'Tailorgang'}){
    return axios.get(`http://ozioma.chibex.net/api/sms_handler.php?username=docaustyne&password=6128&message=${message}&sender=${from}&recipient=${to}&remoteOp=snd&dnd=true`)
  }

  static get auth(){
    return {
      verifycode(user){
        return SMS.send({to : user.phone, message : templates.verification(user)})
      },
      resetPassword(user){
        return SMS.send({to : user.phone, message : templates.resetpassword(user)})
      },
      signup(user){
        return SMS.send({to : user.phone, message : templates.signup(user)})
      }
    }
  }
}
