var express = require('express');
var router = express.Router();
var Quiz = require('../models/question');
var User = require('../models/user');
var fetch = require('node-fetch');

