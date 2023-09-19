var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Comment = require('../models/comment');
var User = require('../models/user');

// Body parsing middleware
app.use(bodyParser.json());

// GET /comments
// get all comments
app.get('/comments', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) {
            return next(err);
        }
        res.json(comments);
    });
});

// POST /comments
// save comment
app.post('/comments', function(req, res, next) {
    var comment = new Comment({
        body: req.body.body,
    });

    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }
        res.status(201).json(comment);
    });
});

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server is listening on port ' + port);
});
