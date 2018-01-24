const passport = require('passport');

let router = require('express').Router();
router.get('/login', passport.authenticate('google', {
	scope: 'https://www.googleapis.com/auth/userinfo.email'
}));

router.get('/login/callback', passport.authenticate('google', {
	successRedirect: '/sell',
  	failureRedirect: '/',
}));

module.exports = router; 