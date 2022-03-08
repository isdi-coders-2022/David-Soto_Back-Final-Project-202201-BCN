require("dotenv").config();
const debug = require("debug")("kinds:root");
const chalk = require("chalk");
const startServer = require("./server");

const port = process.env.SERVER_PORT || 3000;

(async () => {
  try {
    await startServer(port);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
