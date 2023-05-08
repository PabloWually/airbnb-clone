require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
	urlCors: process.env.URL_CORS,
};

module.exports = { config };
