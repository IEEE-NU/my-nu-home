const Listing = require('../models/listing.js');
const moment = require('moment');
let router = require('express').Router();

router.get('/list', (req, res) => {
	Listing.find({}, 'price', (err, docs) => {
		res.render('../views/list', {docs:docs});
	});

});

module.exports = router;