


const app = require('express')();
const bp = require('body-parser');
const port = 7500;


app.use(bp.json());
app.use(bp.urlencoded({extended : true}));
app.use(require('./routes/config'));
require('./responders/responder')(3236);
app.listen(port, () => {
  console.log(`Config App is online at port ${port}`);
})
