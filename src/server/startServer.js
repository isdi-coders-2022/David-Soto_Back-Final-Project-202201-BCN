require("dotenv").config();
const debug = require("debug")("ultrawarriors: server");
const chalk = require("chalk");

const startServer = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on http://localhost:${port}`));
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

module.exports = startServer;
