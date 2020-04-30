
const $p = require('../requesters/auth');


module.exports = (req, res, next) => {
  if(!req.headers['x-access-token']){
    return res.status(401).json('access denied. provide an access token');
  }

  $p.check(req.headers['x-access-token'], req.headers)
  .then(data => {
  	// console.log(data)
    req.login = data;
    next();
  }, err => res.status(401).json(err))
  .catch(err => res.status(500).json(err.toString()))
}
 