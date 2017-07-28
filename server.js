// Dependencies
var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var https = require('https');

var app = express();

// Setting up static pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Helmet middleware for Securing headers
app.use(require('helmet')());

app.use('/weathermeme', require('./routes/weathermeme'));

const options = {
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privKey.pem')
};

app.listen(3000);
https.createServer(options, app).listen(8443);
console.log('Listening on port 3000');
