const express = require("express");
const routes = require("./routes/v1");
const morgan = require("morgan");

const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(morgan("tiny"));

// v1 api routes
app.use("/", routes);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
});

module.exports = app;
