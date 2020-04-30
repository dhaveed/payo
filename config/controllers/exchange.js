const axios = require('axios');
const $db = require('../requesters/database');

module.exports = class c {
    static convert({from = 'USD', to = 'USD', amount = 0} = {}){
      return new Promise((resolve, reject) => {
        c.v3Convert(from)
        .then(Promise.resolve, c.wpConvert(from))
        .then(({rates}) => resolve(rates[to] * amount), reject)
        .catch(reject)
      })
    }

    static wpConvert(from){
      return new Promise((resolve, reject) => {
        axios.get(`https://market.tailorgang.io/wp-content/currency.json`)
        .then(({data}) => {
          data.from = from;
          data.rates = Object.entries(data.rates).map(([key, val]) => [key, (val * (1/data.rates[from]))]).reduce((a, [k,v]) => ({...a, [k] : v}), {})
          resolve(data);
        }, reject)
        .catch(reject)
      })
    }

    static v3Convert(from){
      return new Promise((resolve, reject) => {
        axios.get(`https://v3.exchangerate-api.com/bulk/33754ea64fbfcae396d932a1/${from}`)
        .then(({data}) => Object.keys(data).includes('error') ? reject(data) : resolve(data), reject)
        .catch(reject)
      })
    }

    static locale({country, currency,amount}){
      return $db.Country.findOne({country})
      .then(({cur:currency}) => c.convert({from : currency, to : cur, amount}))
    }

     static async rates(from){
      try{
        return await c.v3Convert(from)
      }catch(e){
        return await c.wpConvert(from)
      }
    }

}
