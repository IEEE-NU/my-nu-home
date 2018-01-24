const passport = require('passport');

let router = require('express').Router(); 
router.get('/sell',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.email'],
  		failureRedirect: '/',
  		session: false,
  	}),
  	(req, res) => {
		if (!req.user) {
			console.log('user undefined');
			res.redirect('/login');
		} else {
			console.log(req.user);
			res.render('sell', {
				active: 'sell',
			});
		}
	}
);
module.exports = router; 

