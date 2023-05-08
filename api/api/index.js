const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { config } = require("./config/config.js");
const routerApi = require('./routes/index');
const cookieParser = require("cookie-parser");
const app = express();

mongoose.connect(config.mongoUrl);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: config.urlCors,
  })
);

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

routerApi(app);

app.listen(4000);
