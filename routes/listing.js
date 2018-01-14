const Listing = require('../models/listing.js');
const moment = require('moment');
let router = require('express').Router();

router.get('/listing/:id', (req, res) => {
	let id = req.params.id;
	Listing.findById(id, (err, listing) => {
		if (err) {
			console.log(`Error retrieving listing with ID ${id}`);
			res.status(404).send("Requested listing does not exist.");
		} else {
			listing.moment = moment;
			res.render('../views/listing', listing);
		}
	});
});

module.exports = router;