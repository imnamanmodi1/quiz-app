var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Quiz = require('../../models/question')
var blankArr = [];


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

// returns all categories
// router.get('/quiz/category', (req,res,next) => {
//     Quiz.find({category: "Personal"}, (err, category) => {
//         if(err) return next(err);
//         res.locals.category = category;
//         for(i=0; i<category.length; i++) {
//             var onlyCat = category[i].category
//         }
//         res.json({category: onlyCat});
//     })
// })


router.get('/quiz/category', (req,res,next) => {
    Quiz.find({}, (err, quizData) => {
        console.log(quizData);
        if(err) return next(err);
        for(i=0; i<quizData.length; i++) {
            var allCat = quizData[i].category;
            blankArr.push(allCat)            
        }
        console.log(blankArr);
        // blankArr.split(",")
        res.json({category: blankArr})
    })
})

module.exports = router;