const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;

//Serializar la información del usuario para crar un id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Busca el usuaria a partir de un id
passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

//Requerir el modelo de usuario
const User = require('../moldes/user')

//req: son otros parametros que se le pueden pedir al usuario diferente a usuario y contraseña. por ejemplo, telefono, direccion, imagen
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  
  const user = await User.findOne({email: email})
  if (user) {
    return done(null, false, req.flash('signupMessage', 'El email ya existe'));

  }else {
    const newUser = new User ();
    newUser.email = email;
    newUser.password = newUser.encriptarContraseña(password);
    await newUser.save();
    done( null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await User.findOne({email: email})
  if (!user) {
    return done(null, false, req.flash('signinMessage', 'El usuario no encontrado'));
  } else {
    if(!user.compararContraseña(password)){
      return done(null, false, req.flash('signinMessage', 'Password Incorrecta'));
    }else {
      done(null, user);
    }
  }
}));


