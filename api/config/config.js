require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = { config };
