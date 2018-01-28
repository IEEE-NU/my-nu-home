const User = require('../models/user.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config.js');

passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: "http://localhost:8080/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("Logged in");
  	User.findById(profile.id, (err, user) => {
  		if (err) {
  			console.error(err);
  			return done(err);
  		} else if (user) {
  			return done(null, user);
  		} else {
  			// TODO: make callback?
  			// let e = isEligible(profile);
  			// if (e) {}
  			let newUser = new User({
  				_id: profile.id,
  				email: profile.emails[0].value,
  			});
  			newUser.save((err, user) => {
  				if (err) {
  					console.error(err);
  					return done(err);
  				} else {
  					return done(null, user);
  				}
  			});
  		}
  	});
  }
));

// TODO
function isEligible(profile) {
	return true;
}

passport.serializeUser(function(user, done) {
	console.log(`Serializing user ${user.id}`);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log(`Deserializing user ${id}`);
	User.findById(id, (err, user) => {
		if (err) { console.error(err); }
		done(err, user);
	});
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