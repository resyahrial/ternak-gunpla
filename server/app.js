if (["development", "test"].includes(process.env.NODE_ENV)) {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const router = require("./routes");
const { errHandler } = require("./middlewares");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errHandler);

module.exports = app;
