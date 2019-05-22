var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Quiz = require('../../models/question')
var blankArr = [];
var uniqueArray = [];


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


// exposes all categories in an Array
router.get('/quiz/category', (req,res,next) => {
    Quiz.find({}, (err, quizData) => {
        // console.log(quizData);
        if(err) return next(err);
        for(i=0; i<quizData.length; i++) {
            var allCat = quizData[i].category;
            blankArr.push(allCat);          
        }
        var catArr = blankArr;  //cat display variable

        // function to only have unique values in array
        function getUnique(catArr){
            // Loop through array values
            for(i=0; i < catArr.length; i++){
                if(uniqueArray.indexOf(catArr[i]) === -1) {
                    uniqueArray.push(catArr[i]);
                }
            }
            return uniqueArray;
        }
        // function getUnique executed
        getUnique(catArr);
        blankArr = [];
        // console.log(uniqueArray);
        res.json({category: uniqueArray})
    })
})

// added dynamic API data routing based on the category of the question
// renders any category data to 
// /quiz/:category renders the specific category targeted in :category section of the URL
router.get('/quiz/:category', (req, res, next) => {
    // console.log(req.params.category)
    var category = req.params.category;
    console.log(category, "category");
    Quiz.find({category: category}, (err, specificCategory) => {
        if(err) return next(err);
        res.locals.specificCategory = specificCategory;
        // console.log(specificCategory);
        res.json({categorySortedData: specificCategory});
    })
})

module.exports = router;