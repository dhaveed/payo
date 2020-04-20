var info = 'media server by Adeojo Emmanuel\n'
         + 'HTTP static file serving in Node.js';

var path = require('path');
var express = require('express');
var app = express();
const port = 9000;
const baseRoutes = require('./routes/media');
var dir = path.join(__dirname, 'public');


app.get('/media/',  (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.use('/media', baseRoutes);


app.listen(port, () => {
    console.log(`Media App is online at port ${port}`);
});

console.log(info);
