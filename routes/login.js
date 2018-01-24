const passport = require('passport');

let router = require('express').Router();
router.get(
	'/login', 
	passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' })
);

router.get('/login/callback',
  	(req, res) => {
  		res.redirect('/sell');
  	}
);

module.exports = router; 