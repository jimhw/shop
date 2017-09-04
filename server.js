// Express framework
const express = require('express')

// MongoDB connector
const mongoose = require('mongoose')

// config file
const config = require('./config/config')

// Parse JSON
const bodyParser = require('body-parser')

// config
const port = config.port
const mongoURL = 'mongodb://'+config.mongo.host+'/'+config.mongo.db

// Connecting to DB
mongoose.connect(mongoURL, { useMongoClient: true })
const db = mongoose.connection
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoURL)
})

// App server
const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json({ type: 'application/json' }))
require('./app/store/store-model')
require('./app/store/routes')(app)

// Start
app.listen(port)
console.log('Listening on port ' +port)
