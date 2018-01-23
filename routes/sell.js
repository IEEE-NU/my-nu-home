let router = require('express').Router(); 
router.get('/sell', (req, res) => {
	res.render('sell', {
		active: 'sell',
	});
});
module.exports = router; 

