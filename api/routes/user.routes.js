const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
const User = require("../Models/User");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("test ok");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});
 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = await bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, _id: userDoc._id },
        config.jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token, { sameSite: 'none', secure: true }).json("pass ok");
        }
      );
    } else {
      res.status(422).json("Wrong Password");
    }
  } else {
    res.json("not found");
  }
});

module.exports = router;
