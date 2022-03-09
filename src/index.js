require("dotenv").config();
const debug = require("debug")("kinds:root");
const chalk = require("chalk");
const connectDB = require("./db");
const startServer = require("./server");

const port = process.env.SERVER_PORT || 3000;
const mongoString = process.env.MONGO_STRING;

(async () => {
  try {
    await connectDB(mongoString);
    await startServer(port);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
