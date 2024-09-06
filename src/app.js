require("express-async-errors");
let express = require("express");
let cors = require("cors");
let helmet = require("helmet");
let xssClean = require("xss-clean");
let mongoSanitize = require("express-mongo-sanitize");
let morgan = require("morgan");
let rateLimiter = require("express-rate-limit");

let app = express();

//middlewares-----------------
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(
  cors({
    origin: "0.0.0.0",
  })
);
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json(`Welcome to cali server`);
});

module.exports = app;
