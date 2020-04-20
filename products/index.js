const app = require('express')();
const bp = require('body-parser');
const cors = require('cors');
// const verifyToken = require('./utils/verifyToken');
const routes = require('./routes/products');
const path = require('path');
const port = 2000;


app.use(cors())
// app.use(verifyToken);
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.get('/product',  (req,res)=>{
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/product', routes);


app.listen(port, () => {
  console.log(`Product App is online at port ${port}`);
})
