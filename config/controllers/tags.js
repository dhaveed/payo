
const fs = require('fs');

module.exports = class {
  static get(req, res){
    let tags = fs.readFileSync("../../../nugi-tailorgang-app-services/public/configs/tags.txt",{encoding:"utf-8"}).split('\r\n').filter(x => x.trim().length);
    res.json(tags);
  }
}
