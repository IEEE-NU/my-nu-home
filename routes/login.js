const User = require('../models/user.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config.js');

// PASSPORT CONFIGURATION
passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: "http://localhost:8080/login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("Logged in with Google OAuth");
  	// console.log(profile);
  	User.findById(profile.id, (err, user) => {
  		if (err) {
  			console.error(err);
  			return done(err);
  		} else if (user) {
  			return done(null, user);
  		} else if (isEligible(profile)) {
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
  		} else {
            console.log("Sign-in with non-Northwestern email address")
            return done(null, false, { message: 'You must have a Northwestern email address to post listings.' })
        }
  	});
  }
));

// TODO
function isEligible(profile) {
  if (profile.emails.length > 0) {
    let email = profile.emails[0].value;
    let domainIndex = email.lastIndexOf('@') + 1;
    if (domainIndex != -1) {
        return email.substring(domainIndex) == 'u.northwestern.edu' ||
            email.substring(domainIndex) == 'northwestern.edu';
    }
  }
	return false;
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

// ROUTE DEFINITIONS
let router = require('express').Router();
router.get('/login', passport.authenticate('google', {
	scope: 'https://www.googleapis.com/auth/userinfo.email'
}));

router.get('/login/callback', passport.authenticate('google', {
	// TODO: Don't redirect to sell everytime
    successRedirect: '/sell',
    failureRedirect: '/',
    failureFlash: true,
}));

module.exports.router = router;
module.exports.checkAuth = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		console.log('Redirecting to login');
		res.redirect('/login');
	}
}