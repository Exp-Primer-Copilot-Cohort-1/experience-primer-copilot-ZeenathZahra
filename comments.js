// create web server with express
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// use body parser to parse JSON body
app.use(bodyParser.json());

// serve static files from public directory
app.use(express.static('public'));

// create a route for the app
// GET /comments
// returns all comments from the database
app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// POST /comments
// adds a new comment to the database
app.post('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),



