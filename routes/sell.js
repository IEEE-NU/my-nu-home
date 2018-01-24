const passport = require('passport');

let router = require('express').Router(); 
router.get('/sell', (req, res) => {
	if (!req.user) {
		console.log('Redirecting to login');
		res.redirect('/login');
	} else {
		console.log(req.user);
		res.render('sell', {
			active: 'sell',
		});
	}
});

module.exports = router; 

