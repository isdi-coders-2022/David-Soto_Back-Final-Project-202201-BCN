const debug = require("debug")("ultrawarriors: controllers:");
const chalk = require("chalk");

const User = require("../../db/models/UserModel");

const loginController = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const registeredUser = await User.findOne({ username });
    if (registeredUser) {
      if (registeredUser.password === password) {
        res.status(200).json({ registeredUser });
      } else {
        const error = new Error("Wrong Username or Password");
        error.code = 400;
        next(error);
      }
    } else {
      const error = new Error("Wrong Username or Password");
      error.code = 400;
      next(error);
    }
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

const registerController = async (req, res, next) => {
  const newUser = req.body;
  const newUsername = newUser.username;
  try {
    const registeredUser = await User.findOne({ username: newUsername });
    if (!registeredUser) {
      await User.create(newUser);
      res.status(200).json({ state: "user created" });
    } else {
      const error = new Error("Username already taken");
      error.code = 400;
      next(error);
    }
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

module.exports = { loginController, registerController };
