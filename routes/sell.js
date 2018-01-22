let router = require('express').Router(); 
router.get('/sell', (req, res) => {
	res.render('sell');
});
module.exports = router; 

