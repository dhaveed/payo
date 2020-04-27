const app = require('express')();
const bp = require('body-parser');
const cors = require('cors');
var Fingerprint = require('express-fingerprint')
// const verifyToken = require('./utils/verifyToken');
const routes = require('./routes/business');
const path = require('path');
const port = 2332;

app.use(cors())
// app.use(verifyToken);
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));


app.get('/business',  (req,res)=>{
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/business', routes);


app.listen(port, () => {
  console.log(`Product App is online at port ${port}`);
})
