var express = require('express');
var router = express.Router();
var Quiz = require('../models/question');
// var catAPI = require('./api/v1');
var fetch = require('node-fetch');


const fetchAPI =(cb)=>{
	fetch('http://localhost:3000/api/v1/quiz/category').then(res => res.json()).then(data => {
			cb(data)
	})
} 

// renders dashboard
router.get('/', function(req, res, next) {
    res.render('dashboard')
});

// renders quiz form
router.get('/create', function (req, res, next) {
    res.render('createForm')
});

// handles quiz creation on dashboard/choose-quiz route
router.get('/choose-quiz', (req, res, next) => {
    fetchAPI((data) => {
        console.log(data, " ........data")
        res.render('chooseQuiz', {data: data})
    })
})


// handles quiz creation on dashboard/create route
router.post('/create', function (req, res, next) {
    // var tags = req.body.tags.split(',');
    // req.body.tags = tags;
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