const User = require('../models/user.js');
const login = require('../routes/login.js');
let router = require('express').Router();

// TODO; Add user page of listings
router.get('/user', login.checkAuth, (req, res) => {
	User.findById(req.user.id, (err, user) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error occurred getting user information.');
		} else {
			user.loggedIn = true;
			user.active = 'user';
			res.render('user', user);
		}
	});
});

module.exports = router;