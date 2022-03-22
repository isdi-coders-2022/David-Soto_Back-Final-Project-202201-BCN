const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const heroRouter = require("./routers/heroRouters");
const userRouter = require("./routers/userRouters");
const authenticateToken = require("./middlewares/authentication");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/user", userRouter);
app.use("/hero", authenticateToken, heroRouter);

module.exports = app;
