const Listing = require('../models/listing.js');
const moment = require('moment');
const login = require('../routes/login.js');
let router = require('express').Router();

router.get('/listing/:id', (req, res) => {
	let id = req.params.id;
	Listing.findById(id, (err, listing) => {
		if (err) {
			console.log(`Error retrieving listing with ID ${id}`);
			res.status(404).send("Requested listing does not exist.");
		} else {
			listing.moment = moment;
			listing.active = '';
			res.render('../views/listing', listing);
		}
	});
});

// TODO: DELETE endpoint for listings
// router.delete('/listing/:id', login.checkAuth, (req, res) => {
// 	let id = req.params.id;
// 	Listing.remove({ _id: id, })
// });

router.post('/listing', (req,res) => {
	console.log(req.body);
	//TODO: Extra validation.
	req.body.loc = {
		type: 'Point',
		coordinates: [req.body.latitude, req.body.longitude]
	};
	let listing = new Listing(req.body);
	listing.loc = {
		type: 'Point',
		coordinates: [ req.body.latitude, req.body.longitude ],
	};
	listing.save((err, listing) => {
		if (err) {
			console.error(err);
			res.status(500).send('Failed to save listing: ' + err);
		} else {
			res.json({id: listing.id});
		}
	});
});

router.get('/listing/:id/edit', login.checkAuth, (req, res) => {
	res.status(500).send('unimplemented');
});

module.exports = router;
