var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Quiz = require('../../models/question')


// to expose all users in the API
router.get('/users', (req,res,next) => {
    User.find({}, (err, users) => {
    if (err) return next(err);
    res.locals.users = users;
    res.json({users: users});
    });
});

// to expose all the quiz in the API
router.get('/quiz', (req,res,next) => {
    Quiz.find({}, (err, quiz) => {
    if (err) return next(err);
    res.locals.quiz = quiz;
    res.json({quiz: quiz});
    });
});

module.exports = router;