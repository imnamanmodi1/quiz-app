var express = require('express');
var router = express.Router();
var Quiz = require('../models/question');


// renders dashboard
router.get('/', function(req, res, next) {
    res.render('dashboard')
});

router.get('/create', function (req, res, next) {
    res.render('createForm')
});

router.post('/create', function (req, res, next) {
    var tags = req.body.tags.split(',');
    req.body.tags = tags;
    var correctAnswer = req.body.correct;
    var stringAnswer;
    if (correctAnswer === "1") {
        req.body.correct = req.body.option1
    }
    else if(correctAnswer === "2") {
        req.body.correct = req.body.option2
    }
    else if(correctAnswer === "3") {
        req.body.correct = req.body.option3
    }
    else if(correctAnswer === "4") {
        req.body.correct = req.body.option4
    }
    // to handle & save the correct answer in string to match
    Quiz.create(req.body, (err)=>{
        if(err) return next(err);
        res.redirect('/dashboard/create')
    })
});

module.exports = router;