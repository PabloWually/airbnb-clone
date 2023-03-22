const express = require('express');
const { config } = require("../config/config.js");
const imageDownloader = require("image-downloader");
const Place = require("../Models/Place");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("test ok");
});

router.post('/upload-by-link', async (req, res) => {
	const {link} = req.body;
	const newName = "photo" + Date.now() + '.jpg';
	await imageDownloader.image({
		url: link,
		dest: __dirname + '/../uploads/' + newName,
	});
	res.json(newName);
});

module.exports = router;
