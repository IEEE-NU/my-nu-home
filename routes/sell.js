const login = require('../routes/login.js');

let router = require('express').Router(); 
router.get('/sell', login.checkAuth, (req, res) => {
	console.log(req.user);
	res.render('sell', {
		active: 'sell',
	});
});

module.exports = router; 

