const express = require('express');
const userRoutes = require('./user.routes');

function routeApi(app) {
	const route = express.Router();
	app.use('/api/v1', route);
	route.use('/users', userRoutes);
}

module.exports = routeApi;
