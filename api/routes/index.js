const express = require('express');
const userRoutes = require('./user.routes');
const placesRoutes = require("./place.route");
function routeApi(app) {
	const route = express.Router();
	app.use('/api/v1', route);
	route.use('/users', userRoutes);
	route.use('/places', placesRoutes);
}

module.exports = routeApi;
