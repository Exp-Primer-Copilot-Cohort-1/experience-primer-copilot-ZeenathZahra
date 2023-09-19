//Create web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const User = require('./models/user');
const Post = require('./models/post');
const { response } = require('express');
const { request } = requir