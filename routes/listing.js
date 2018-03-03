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
    fileSize: 25 * 1024 * 1024 // no larger than 25mb
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
			for(let i = 0; i < listing.imageNumber; i++){
				listing.imageLinks.push('http://' + (process.env.NODE_ENV !== 'production' ? 'staging.' : '') +
					`my-nu-home-1513614055126.appspot.com.storage.googleapis.com/${id}/${i}`);
			}

			User.findById(listing.owner, (err,user) => {
				if (err) {
					console.error(err);
					console.log(`Error retrieving listing with ID ${id}`);
					res.status(500).send("Error occurred when attempting to retrieve listing.");
				}
				else {
					listing.email = user.email;
					listing.isOwner = req.user && req.user.id == listing.owner.toString();
					listing.moment = moment;
					listing.active = '';
					listing.loggedIn = req.user !== undefined;
					res.render('../views/listing', listing);
				}

			});
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

router.post('/listing', multer.array('images'), (req, res, next) => {
	console.log(req.body);
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
	}

	if (!req.body.negotiable) {
		req.body.negotiable = false;
	}
	
	let listing = new Listing(req.body);
	listing.owner = req.user.id;
	if (req.files) {
		listing.imageNumber = req.files.length;
		for (let i=0; i < req.files.length;i++){
			const blob = image.file(listing._id + "/" + i.toString());
			const blobStream = blob.createWriteStream({
				metadata: {
					contentType: req.files[i].mimetype,
				}
			});

			blobStream.on('error', (err) => {
				console.log("errorthing");
				console.log(err);
		    	next(err);
		    	return;
		  	});

	  		blobStream.on('finish', () => {
	  			if (i === req.files.length - 1) {
		  			savelisting(listing, res, req);
		  		}
			});
			blobStream.end(req.files[i].buffer);
		}

	} else {
		listing.imageNumber = 0;
		savelisting(listing, res, req);
	}
});


function savelisting(listing, res, req){
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
				(err, message) => {
					if (err) {
						res.status(500).json({error: err})
					} else {
						res.json({id: listing.id});
					}
				}
			)
		}
	})};


router.get('/listing/:id/edit', login.checkAuth, (req, res) => {
	res.status(500).send('unimplemented');
});

module.exports = router;
