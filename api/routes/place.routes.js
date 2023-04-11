const express = require('express');
const { config } = require("../config/config.js");
const imageDownloader = require("image-downloader");
const Place = require("../Models/Place");
const multer = require("multer");
const fs = require('fs');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
	res.json("test ok");
});

router.post('/upload-by-link', async (req, res) => {
	const { link } = req.body;
	const newName = "photo" + Date.now() + '.jpg';
	await imageDownloader.image({
		url: link,
		dest: __dirname + '/../uploads/' + newName,
	});
	res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" })
router.post('/uploads', photosMiddleware.array('photos', 10), (req, res) => {
	const uploadedFiles = []
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname } = req.files[i];
		const parts = originalname.split('.');
		const ext = parts[parts.length - 1];
		const newPath = path + '.' + ext;
		fs.renameSync(path, newPath)
		uploadedFiles.push(newPath.replace('uploads/', ''));
	}
	res.json(uploadedFiles);
})

router.post('/create', (req, res) => {
	const { token } = req.cookies;
	const {
		title, address, addedPhotos, description,
		perks, extraInfo, checkIn, checkOut, maxGuests
	} = req.body;
	jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const placeDoc = await Place.create({
			owner: userData._id,
			title, address, photos: addedPhotos, description,
			perks, extraInfo, checkIn, checkOut, maxGuests
		});
		res.json(placeDoc);
	});
});

module.exports = router;
