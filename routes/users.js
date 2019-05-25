var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
var userNameArr = [];
var Quiz = require('../models/question')

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

// route for editing user
router.get('/:id/edit', (req, res, next)=>{
  var id = req.params.id;
  console.log(id);
  User.findById(id, (err, user)=>{
    if(err) return next(err);
      res.render('userEdit', {user: user})
  })
})


// route for updating the user
router.post('/:id/update', (req, res, next)=>{
  var id = req.params.id;
  console.log(id)
  User.findByIdAndUpdate(id, req.body, {new: true}, (err, user)=>{
    if(err) return next(err);
    res.redirect('/users/profile');
  })
})

// deletes the user and redirects it to register form

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

// display onlylogged in user's info
router.get('/profile', (req, res, next)=>{
  // console.log(req.session.user)
  if(req.session && req.session.user){
    console.log(req.session.user)
      User.find({_id: req.session.user}, (err, userData)=>{
          if(err) return next(err);
          res.render('userDisplay', {user: userData})
      })
  }
  else{
      res.send('user not found, fuck off!')
  }
})

// route handling logout

router.get('/logout', (req, res)=>{
  if (req.session) {
      req.session.destroy();
      res.render('loginForm')
  }
})

router.get('/settings/quiz-list', (req, res, next)=>{
  if(req.session && req.session.user){
    User.findById(req.session.user, (err, user)=>{
      if(err) return next(err);
      Quiz.find({user: user._id}, (err, question)=>{
        console.log(question);
        res.send(question)
      } )
    })
  }
})

// editing the quiz route which renders edit form
router.get('/settings/quiz-list/edit/:id', (req, res, next)=>{
  var id = req.params.id;
  // console.log(id, "id.....");
  if(req.session && req.session.user){
    Quiz.findById(id, (err, quiz) => {
      // console.log(id,"id insider if")
      console.log(quiz, "quiz check 1")
      if(err) return next(err)
      res.render('quiz-edit',{quiz: quiz})
    })
  }
})


// route to update the quiz in db
router.post('/settings/quiz-list/update/:id', (req, res, next)=>{
  var id = req.params.id;
  // console.log(id, "id.....");
  if(req.session && req.session.user){
    Quiz.findByIdAndUpdate(id,req.body, {new: true},(err, quiz) => {
      // console.log(id,"id insider if")
      console.log(quiz, "quiz check 1")
      if(err) return next(err)
      res.send('edited')
    })
  }
})





module.exports = router;
