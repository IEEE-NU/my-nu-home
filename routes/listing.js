const Listing = require('../models/listing.js');
const moment = require('moment');
const login = require('../routes/login.js');
const User = require('../models/user.js');
const image = require('../models/image.js');
const Multer = require('multer');
let router = require('express').Router();

const utilities = ['water','electricity','gas','wifi','heat'];
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 10mb
  }
});

router.get('/listing/:id', (req, res) => {
	let id = req.params.id;
	Listing.findById(id, (err, listing) => {
		if (err) {
			console.error(err);
			console.log(`Error retrieving listing with ID ${id}`);
			res.status(500).send("Error occurred when attempting to retrieve listing.");
		} else {
			if (!listing) {
				res.status(404).send("Requested listing does not exist.");
				return;
			}

			listing.imageLinks = [];
			console.log(listing.imageNumber);
			for(let i = 0; i < listing.imageNumber; i++){
				listing.imageLinks.push(`http://staging.my-nu-home-1513614055126.appspot.com.storage.googleapis.com/${id}/${i}`);
			}
			console.log(listing.imageLinks);


			if (req.user) {
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
			listing.loggedIn = req.user !== undefined;

			res.render('../views/listing', listing);
		}
	});
});

// TODO: DELETE endpoint for listings
router.delete('/listing/:id', (req, res) => {
	let id = req.params.id;
	Listing.findById(id, (err, listing) => {
		if (err) {
			console.error(err);
			res.status(500).send('Failed to remove listing: ' + err);	
		} else {
			console.log(listing);
			listing.remove((err) => {
				if (err) {
					console.error(err);
					res.status(500).send('Failed to remove listing: ' + err);
				} else {
					User.update(
						{ _id: listing.owner },
						{ $pull: { listings: { id: listing.id } } }, (err, numAffected) => {
							if (err) {
								console.error(err);
								res.status(500).send('Failed to dissociate listing from user: ' + err);
							} else {
								console.log(numAffected + ' removed from user ' + listing.owner);
								res.status(200).send();
							}
						}
					);
				}
			});
		}
	});
});

router.post('/listing', (req, res) => {
	console.log(req.body);
	console.log(req.file);
	console.log(req.files);
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

	let listing = new Listing(req.body);
	listing.loc = {
		type: 'Point',
		coordinates: [ req.body.latitude, req.body.longitude ],
	};

	// TODO: Grab this number from the form.
	listing.imageNumber = 2;

	// console.log(req.user);
	listing.owner = req.user.id;

	listing.save((err, listing) => {
		if (err) {
			console.error(err);
			res.status(500).send('Failed to save listing: ' + err);
		} else {
			User.update(
				{_id: req.user.id},
				{$push: {listings: {
					id: listing.id,
					address: listing.address,
				}}},
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

router.post('/images', multer.array('images'), (req, res, next) => {
	if (req.files) {
		console.log(req.files);
		res.status(200).send();
	} else {
		console.log("pls");
		res.status(500).send();
	}
});

router.get('/listing/:id/edit', login.checkAuth, (req, res) => {
	res.status(500).send('unimplemented');
});

module.exports = router;
