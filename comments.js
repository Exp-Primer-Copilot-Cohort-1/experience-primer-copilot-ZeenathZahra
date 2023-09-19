// create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');

// GET /comments
// get all comments
router.get('/', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) {
            return next(err);
        }
        res.json(comments);
    });
});

// POST /comments
// save comment
router.post('/', function(req, res, next) {
    var comment = new Comment({
        body: req.body.body,
    });
});

