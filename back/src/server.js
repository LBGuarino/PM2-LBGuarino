const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(router);

module.exports = app;