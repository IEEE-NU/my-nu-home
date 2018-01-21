const mongoose = require('mongoose');
const listingSchema = mongoose.Schema({
	address: String,
	baths: Number,
	beds: Number,
	blurb: {
		type: String,
		trim: true,
		maxlength: 500,
	},
	endPeriod: Date,
	parking: {
		type: String,
		enum: ['No', 'Garage', 'Outdoors'],
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
});

let Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;