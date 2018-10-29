const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//
const app = express();
require('./database');
require('./passport/local-auth');

//Settigns
app.set('port', process.env.PORT || 3000)

//Midlewares
app.set('views', path.join(__dirname, 'views'))
app.use(morgan('dev'));
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  next();
});

//Routes 
const route = require('./routes/index');
app.use(route);

//Starting server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', 'http://localhost:' + app.get('port '))
})