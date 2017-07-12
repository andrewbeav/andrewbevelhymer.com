// Dependencies
var express = require('express');
var path = require('path');
var cors = require('cors');

var app = express();

// Setting up static pages
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/weathermeme', require('./routes/weathermeme'));

app.listen(3000);
console.log('Listening on port 3000');
