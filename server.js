// Importing modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');

// Setting routes
var api = require('./routes/api');

// // Initialize vars
var app = express();

// Static Folder
app.use('/', express.static(path.join(__dirname, 'dist')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);
app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'));
  });

// Run server
app.listen(process.env.PORT || 8080, () => {
    console.log('Server started on port');
});
