const express = require('express'); 
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/signup', (req, res, next) => {
  res.render('signup')
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
  res.render('signin')
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

//Tiene que cumplirse que esta autenticado para poder ingresar a las siguientes rutas
router.use((req, res, next) => {
  isAuthenticated(req, res, next);
  next();
})

//Estas rutas podra entrar solo si esta autenticado con el mentodo isAuthenticated
router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/dashboard', (req, res, next) => {
  res.send('dashboard');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;