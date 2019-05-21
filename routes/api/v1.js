var express = require('express');
var router = express.Router();
var User = require('../../models/user');


// to expose all users in the API
router.get('/users', (req,res,next) => {
    User.find({}, (err, users) => {
    if (err) return next(err);
    res.locals.users = users;
    res.json({users: users});
    });
});

module.exports = router;