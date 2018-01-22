const Listing = require('../models/listing.js');
const moment = require('moment');
let router = require('express').Router();

router.get('/list', (req, res) => {
	Listing.find({}, 'price address startPeriod', (err, docs) => {
		res.render('../views/list', {
			docs: docs,
			moment: moment,
		});
	});

});

module.exports = router;