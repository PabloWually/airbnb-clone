const express = require('express');
const { config } = require("../config/config.js");
const imageDownloader = require("image-downloader");
const Place = require("../Models/Place");
const multer = require("multer");
const fs = require('fs')

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

const photosMiddleware = multer({dest:"uploads/"})
router.post('/uploads', photosMiddleware.array('photos', 10),(req, res) => {
	const uploadedFiles = []
	for(let i = 0; i < req.files.length; i++){
		const {path, originalname} = req.files[i];
		const parts = originalname.split('.');
		const ext = parts[parts.length - 1];
		const newPath = path + '.' + ext;
		fs.renameSync(path, newPath)
		uploadedFiles.push(newPath.replace('uploads/',''));
	}
	res.json(uploadedFiles);
})
module.exports = router;
