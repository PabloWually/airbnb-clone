const express = require("express");
const Booking = require("../Models/Booking");

const router = express.Router();

router.post("/create", (req, res) => {
	const {
		place, checkIn, checkOut, numberOfGuests, name, phone, price,
	} = req.body; 
	Booking.create({
		place, checkIn, checkOut, numberOfGuests, name, phone, price,
	}).then((doc) => {
			res.json(doc);
		}).catch(err => {
			throw err;
	});
});

module.exports = router;
