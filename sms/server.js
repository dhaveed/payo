if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const port = 7000;
// Middleware Plugins
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}));

// Routes
server.use('/', [
  require('./routes/sms')
])

// Start the server
server.listen(port, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:' + port)
})