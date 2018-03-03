const Listing = require('../models/listing.js');
const moment = require('moment');
let router = require('express').Router();

router.get('/list', (req, res) => {
	Listing.find({}, 'saleType price address startPeriod loc genderPreferred', (err, docs) => {
		// console.log(docs);
		res.render('../views/list', {
			docs: docs,
			moment: moment,
			active: 'list',
			loggedIn: req.user !== undefined,
		});
	});
});

module.exports = router;
