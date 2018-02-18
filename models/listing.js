const mongoose = require('mongoose');
const listingSchema = mongoose.Schema({
	address: String,
	baths: Number,
	beds: Number,
	blurb: {
		type: String,
		trim: true,
		maxlength: 300,
	},
	endPeriod: Date,
	genderPreferred: {
		type: String,
		enum: ['male', 'female', 'none'],
		required: true,
	},
	owner: Number,
	parking: {
		type: String,
		enum: ['no', 'garage', 'outdoors'],
	},
	parkingCost: Number,
	petsCost: {
		type: Number,
		required: false,
	},
	price: Number,
	saleType: {
		type: String,
		enum: ['lease', 'sublet'],
		required: true,
	},
	smoking: Boolean,
	size: Number, // square feet
	startPeriod: Date,
	utilities: Array,
	loc: {
		type: { type: String },
		coordinates: [ Number ]
	},
});

listingSchema.index({loc: '2dsphere'});
let Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
