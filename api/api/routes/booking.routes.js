const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const Booking = require("../Models/Booking");

const router = express.Router();

router.post("/create", (req, res) => {
	const { token } = req.cookies;
	const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
		req.body;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		Booking.create({
			place,
			checkIn,
			checkOut,
			numberOfGuests,
			name,
			phone,
			price,
			user: userData._id,
		})
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => {
				throw err;
			});
	});
});

router.get("/list", (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const { _id } = userData;
		res.json(await Booking.find({ user: _id }).populate("place"));
	});
});

router.get("/alreadyBooking/:id", (req, res) => {
	const {id} = req.params;
	const { token } = req.cookies;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const { _id } = userData;
		const places = await Booking.find({ user: _id });
		const place = places.some( item => item.place.toString() === id)
		res.json(place);
	});
});

module.exports = router;
