
const $c = require('../requesters/database');

module.exports = class countriesController{
  static get(req, res){
    $c.Country.find({})
    .then(countries => res.json(countries))
    .catch(err => res.status(500).json(err.toString()))
  }
}
