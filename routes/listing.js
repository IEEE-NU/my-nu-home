const Listing = require('../models/listing.js');
const moment = require('moment');
const login = require('../routes/login.js');
const User = require('../models/user.js');
let router = require('express').Router();

const utilities = ['water','electricity','gas','wifi','heat'];

router.get('/listing/:id', (req, res) => {
	let id = req.params.id;
	Listing.findById(id, (err, listing) => {
		if (err) {
			console.log(`Error retrieving listing with ID ${id}`);
			res.status(404).send("Requested listing does not exist.");
		} else {
			// check if the user is logged in
			// if logged in, check if user ID matches the ID of the owner field in the listing
			// if it does, inject something into EJS that tells it that the owner is looking at the listing
			//listing.isOwner = true;
			if (req.user){
				if (req.user.id == listing.owner.toString()){
					listing.isOwner = true;
				}
				else {
					listing.isOwner = false;
				}
			}
			else {
				listing.isOwner = false;
			}

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
	req.body.utilities = [];
	for (let i=0; i< utilities.length; i++) {
		if (req.body[utilities[i]] == 'on') {
			req.body.utilities.push(utilities[i]);
		}
	};
	console.log(req.body.utilities);

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
			User.update(
				{_id: req.user.id},
				{$push: {listings: listing.id}},
				(err,message) => {
					if (err) {
						res.status(500).json({error: err})
					} else {
						res.json({id: listing.id});
					}
				}
			)
		}
	});
});

router.get('/listing/:id/edit', login.checkAuth, (req, res) => {
	res.status(500).send('unimplemented');
});

module.exports = router;
