var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
var userNameArr = [];

// rendered login form
router.get('/login', function(req, res, next) {
  res.render('loginForm')
});



// rendered register form
router.get('/register', function(req, res, next) {
  res.render('regForm')
});


// // rendered dashboard
// router.get('/dashboard', function(req, res, next) {
//   res.render('dashboard')
// });


// handle registration form's POST requests from the /users/register slug
router.post('/register', function(req, res, next) {
  // find if the user already exists
User.findOne({email: req.body.email}, (err, user) => {
  if(err) throw next(err);
  console.log('user already exists, please choose a unique email which is not registered')
})
  // if user doesn't exist create user & after successful registration redirects the user to the /dashboard URL.
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }, (err, user) => {
    if(err) return next(err);
    console.log('registration of user is successful')
    res.status(201).redirect('/users/login')
  })
});

// handles POST requests of login form
router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username}, (err, user) => {
    console.log(req.body.username, "is logged in...");
    if(err) throw next(err);
    if (!user) {
      return res.status(400).redirect('/users/login')
      console.log('user not found')
    }
    if(user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) return next(err);
        console.log(isMatch)
        if(isMatch) {
          console.log(isMatch)
          console.log('Login successfull')
          req.session.user = user._id;
          var userLoggedIn = req.body.username;
          console.log(userLoggedIn)
          return res.redirect('/dashboard');
        }
        if(!isMatch) {
          res.status(400).redirect('/users/login')
        } 
      });
    }
  })
});

// display user route

// router.get('/profile', function (req, res) {
//   User.find({}, (err, userlist)=>{
//     if(err) return next(err);
//     res.render('userDisplay', {allusers: userlist})
//   })
// })

router.get('/bloguser', (req, res, next)=>{
  if(req.session && req.session.user._id){
      Blog.find({}, (err, userbloglist)=>{
          if(err) return next(err);
          res.render('bloguser', {blogitems: userbloglist})
      })
  }
  else{
      res.render('blogdisplay')
  }
})

router.get('/profile', (req, res, next)=>{
  // console.log(req.session.user)
  if(req.session && req.session.user){
      User.find({_id: req.session.user}, (err, userData)=>{
          if(err) return next(err);
          res.render('userDisplay', {user: userData})
      })
  }
  else{
      res.send('user not found, fuck off!')
  }
})

module.exports = router;
