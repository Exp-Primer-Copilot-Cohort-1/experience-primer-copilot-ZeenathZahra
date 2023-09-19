// create web server
var express = require('express');
var app = express();

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

// define schema
var CommentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// compile schema to model
var Comment = mongoose.model('Comment', CommentSchema, 'comments');

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set up body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up static public directory
app.use(express.static(__dirname + '/public'));

// set up form
app.get('/comments', function(req, res) {
    res.render('comments');
});

// get all comments
app.get('/comments/all', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) return res.status(500).send({error: 'database failure'});
        res.json(comments);
    });
});

// get comment by id
app.get('/comments/:comment_id', function(req, res) {
    Comment.findOne({_id: req.params.comment_id}, function(err, comment) {
        if (err) return res.status(500).json({error: err});
        if (!comment) return res.status(404).json({error: 'comment not found'});
        res.json(comment);
    });
});

// get comment by name
app.get('/comments/name/:name', function(req, res) {
    Comment.find({name: req.params.name}, {_id: 0, name: 1, comment: 1}, function(err, comments) {
        if (err) return res.status(500).json({error: err});
        if (comments.length === 0) return res.status(404).json({error: 'comment not found'});
        res.json(comments);
    });
});

// create comment
app.post('/comments', function(req, res) {
    var comment = new Comment();
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    comment.save(function(err) {
        if (err) {
            console.error(err);
            res.json({result: 0});
            return



