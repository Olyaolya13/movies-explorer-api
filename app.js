require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const cors = require("cors");
const limiter = require("./middlewares/rateLimit");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/index");
const errorServer = require("./middlewares/errorServer");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const app = express();

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

// app.use(limiter);

app.use("/", router);

app.use(errorLogger);

app.use(errors());

app.use(errorServer);

app.listen(PORT);
