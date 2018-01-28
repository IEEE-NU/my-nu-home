const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.MY_NU_HOME_GOOGLE_ID,
    clientSecret: process.env.MY_NU_HOME_GOOGLE_SECRET,
    callbackURL: "http://localhost:8080/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("Logged in");
  	console.log(profile);
    done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
	console.log("serializing");
	done(null, user.id);
});

passport.deserializeUser(function(user, done) {
	console.log("deserializing");
	done(null, user);
});

let router = require('express').Router();
router.get('/login', passport.authenticate('google', {
	scope: 'https://www.googleapis.com/auth/userinfo.email'
}));

router.get('/login/callback', passport.authenticate('google', {
	successRedirect: '/sell',
  	failureRedirect: '/',
}));

module.exports.router = router;
module.exports.checkAuth = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}