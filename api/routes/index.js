const express = require('express');
const userRoutes = require('./user.routes');
const placesRoutes = require("./place.routes");
const bookingRoutes = require("./booking.routes");
function routeApi(app) {
	const route = express.Router();
	app.use('/api/v1', route);
	route.use('/users', userRoutes);
	route.use('/places', placesRoutes);
	route.use('/booking', bookingRoutes);
}

module.exports = routeApi;
