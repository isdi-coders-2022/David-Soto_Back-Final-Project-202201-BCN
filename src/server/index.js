const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const heroRouter = require("./routers/heroRouters");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/hero", heroRouter);

module.exports = app;
