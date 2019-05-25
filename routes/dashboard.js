var express = require('express');
var router = express.Router();
var Quiz = require('../models/question');
var User = require('../models/user');
var fetch = require('node-fetch');

// fetching all categories in an Array
const fetchAPI =(cb)=>{
	fetch('http://localhost:3000/api/v1/quiz/category').then(res => res.json()).then(data => {
			cb(data)
	})
} 

// renders dashboard
router.get('/', function(req, res, next) {
    if(req.session && req.session.user){
        User.find({}, (err, user) => {
            if(err) return next(err)
            req.user = user;
            res.locals.user = user;
            res.render('dashboard',{user: user})
        })
    }
    else{
        res.send('first login');
    }
});


// renders quiz form
router.get('/create', function (req, res, next) {
    if(req.session && req.session.user){
        User.findById(req.session.user,(err, user) => {
            if(err) return next(err)
            req.user = user;
            res.locals.user = user;
            console.log(user,"....usern")
            res.render('createForm', {user: user})
        })
    }
    else{
        res.send('first login');
    }
});

// // renders displayQuiz on the pages
// router.get('/create/category', function (req, res, next) {

// });

// handles get request on dashboard/choose-quiz route
router.get('/choose-quiz', (req, res, next) => {
    fetchAPI((data) => {
        // console.log(data, " ........quizdata")
        res.render('chooseQuiz', {data: data})
    })
})

// handles dyanamic routing for displaying quiz category based on URL Params
router.get('/:category/start', (req,res, next) => {
    var category = req.params.category;
    Quiz.find({category: category}, (err, oneCategory) => {
        if(err) return next(err);
        res.locals.oneCategory = oneCategory;
        res.render('displayQuiz', {categorySortedData: oneCategory})
    })
})


// handles quiz creation on dashboard/create route
router.post('/create', function (req, res, next) {
    console.log(req.body)
    var correctAnswer = req.body.correct;
    var upperCaseCategory = req.body.category.toLowerCase();
    console.log(upperCaseCategory);
    req.body.category = upperCaseCategory;
    var stringAnswer;
    if (correctAnswer === "1") {
        req.body.correct = '1';
    }
    else if(correctAnswer === "2") {
        req.body.correct = '2';
    }
    else if(correctAnswer === "3") {
        req.body.correct ='3';
    }
    else if(correctAnswer === "4") {
        req.body.correct = '4';
    }
    // to handle & save the correct answer in string to match
    Quiz.create(req.body, (err)=>{
        if(err) return next(err);
        res.redirect('/dashboard/create')
    })
});


// exports.userSession = (req, res, next)=>{
//     if(req.session && req.session.user){
//         Users.findById(req.session.user, (err, user)=>{
//             if(err) return next(err)
//             req.user = user;
//             res.locals.user = user;
//             next()
//         })
//     }
//     else{
//         req.user = null;
//         res.locals.user = null;
//         next()
//     }
// }



module.exports = router;