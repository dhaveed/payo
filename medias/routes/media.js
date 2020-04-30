

const router = require('express').Router();
var path = require('path');
var fs = require('fs');
var dir = path.join(__dirname, '..', 'public');
var multer  = require('multer')
var upload = multer({dest:'public/'});
const $u  = require('../requesters/database.user')

var mime = {    
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    mp4: 'images/mp4'
};

router.post('/ppic/:userid', upload.single('photos'), function(req,res){
    if (!req.files || _.isEmpty(req.files)) {
        return res.status(400).json({photos : 'please provide either an image, or video or both ', files:req.files})
    }else{
      $u.User.userpics(req.params.userid, req.file.filename).then(user =>  {
          res.json({"message": "successfully updated"});
          }, err => {
          console.log(err);
          res.status(400).json(err)
      }).catch(err => res.status(500).json(err.toString()))
    }
});
   

router.get('*', function (req, res) {
    // console.log(dir)
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});


module.exports = router;
