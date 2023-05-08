const express = require('express');
const { config } = require("../config/config.js");
const Place = require("../Models/Place");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
	res.json("test ok");
});

router.post('/create', (req, res) => {
	const { token } = req.cookies;
	const {
		title, address, addedPhotos, description,
		perks, extraInfo, checkIn, checkOut, maxGuests, price
	} = req.body;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const placeDoc = await Place.create({
			owner: userData._id,
			title, address, photos: addedPhotos, description,
			perks, extraInfo, checkIn, checkOut, maxGuests, price
		});
		res.json(placeDoc);
	});
});

router.put('/update', (req, res) => {
	const { token } = req.cookies;
	const {
		id, title, address, addedPhotos, description,
		perks, extraInfo, checkIn, checkOut, maxGuests, price
	} = req.body;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const placeDoc = await Place.findById(id);
		if(userData._id === placeDoc.owner.toString())
		placeDoc.set({
			title, address, photos: addedPhotos, description,
			perks, extraInfo, checkIn, checkOut, maxGuests, price
		});
		await placeDoc.save();
		res.json("ok");
	});
});

router.delete("/delete/:id", async(req, res) => {
	const {id} = req.params;
	const {data} = await Place.deleteOne({_id: id});
	res.json(data);
});

router.get("/place/:id", async(req, res) => {
	const {id} = req.params;
	res.json(await Place.findById(id));
});

router.get("/list", async (req, res) => {
	res.json(await Place.find());
});

router.get("/list-by-user", (req, res) => {
	const {token} = req.cookies;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const {_id} = userData;
		res.json( await Place.find({owner:_id}));
	});
});

router.get("/list/:id", async (req, res) => {
	const {id} = req.params;
	res.json( await Place.findById(id));
});

module.exports = router;
