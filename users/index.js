const router = require('express').Router();
const express = require('express');
const app = express();
const bp = require('body-parser');
const port = 6000;
const id = "\\w{24}";
const cors = require('cors');
const path = require('path');

app.use(cors())

app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.get('/users/',  (req,res)=>{
	res.sendFile(path.join(__dirname, 'public/index.html'))
})



const verifyToken = require('./utils/verifyToken');
const uroute = require('./routes/user');
//app.use(verifyToken);
app.use('/users', uroute);
app.use(`/users/:user/wallet/`, require('./routes/wallet'))

app.listen(port, () => {
  console.log(`Users App is online at port ${port}`);
})
