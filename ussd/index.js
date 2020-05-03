const app = require('express')();
const bp = require('body-parser');
const cors = require('cors');
var Fingerprint = require('express-fingerprint')
// const verifyToken = require('./utils/verifyToken');
const routes = require('./routes/ussdRoute');
const path = require('path');
const port = 2000;
require('dotenv').config()

app.use(cors())
// app.use(verifyToken);
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.use(Fingerprint({
	parameters:[
		// Defaults
		Fingerprint.useragent,
		Fingerprint.acceptHeaders,
		Fingerprint.geoip,
	]
}))

app.get('/card_charge',  (req,res)=>{
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/charge_card', routes);


app.listen(port, () => {
  console.log(`Product App is online at port ${port}`);
})
