const mongoose = require('mongoose');
const listingSchema = mongoose.Schema({
	price: Number,
	address: String,
});

let Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;