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
    Quiz.create(req.body, (err)=>{
        if(err) return next(err);
        res.redirect('/dashboard/create')
    })
});

module.exports = router;
