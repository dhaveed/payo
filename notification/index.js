
const app = require('express')();
const bp = require('body-parser');
const port = 4000;


app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.use('/', (req, res) => {
  res.send('hello from Notification App');
})

require('./subscribers/auth.subscriber')(3233);
require('./subscribers/auth.subscriber')(3234);

app.listen(port, () => {
  console.log(`Notification App is online at port ${port}`);
})
