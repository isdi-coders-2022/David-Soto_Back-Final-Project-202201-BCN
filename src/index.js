require("dotenv").config();
const debug = require("debug")("ultrawarriors: root");
const chalk = require("chalk");
const connectDB = require("./db");
const startServer = require("./server/startServer");
const app = require("./server/index");

const port = process.env.SERVER_PORT || 3000;
const mongoString = process.env.MONGO_STRING;

(async () => {
  try {
    await connectDB(mongoString);
    await startServer(port, app);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
