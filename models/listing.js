const mongoose = require('mongoose');
const listingSchema = mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	baths: {
		type: Number,
		required: true,
	},
	beds: {
		type: Number,
		required: true,
	},
	blurb: {
		type: String,
		trim: true,
		maxlength: 300,
	},
	endPeriod: Date,
	genderPreferred: {
		type: String,
		enum: ['male', 'female', 'other', 'none'],
		required: true,
	},
	negotiable: {
		type: Boolean, 
		required: true,
	},
	occupants: {
		type: Number,
	},
	owner: {
		type: Number,
		required: true,
	},
	parking: {
		type: String,
		enum: ['no', 'garage', 'outdoors'],
	},
	parkingCost: Number,
	petsCost: {
		type: Number,
		required: false,
	},
	price: {
		type: Number,
		required: true,
	},
	saleType: {
		type: String,
		enum: ['lease', 'sublet'],
		required: true,
	},
	smoking: Boolean,
	size: Number, // square feet
	startPeriod: {
		type: Date,
		required: true,
	},
	utilities: Array,
	vacancies: Number,
	loc: {
		type: { type: String },
		coordinates: [ Number ],
	},
});

listingSchema.index({loc: '2dsphere'});
let Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
