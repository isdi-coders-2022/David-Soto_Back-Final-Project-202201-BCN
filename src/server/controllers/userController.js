const debug = require("debug")("ultrawarriors: controllers:");
const chalk = require("chalk");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/UserModel");

const loginController = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const registeredUser = await User.findOne({ username });
    if (registeredUser) {
      const acces = Bcrypt.compareSync(password, registeredUser.password);
      if (acces) {
        const token = jwt.sign(registeredUser.toJSON(), process.env.API_KEY, {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        });
        res.status(200).json({ state: "user logged in", token });
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
      const newUserDB = {
        username: newUsername,
        password: Bcrypt.hashSync(newUser.password, 10),
      };
      await User.create(newUserDB);
      const token = jwt.sign(newUserDB, process.env.API_KEY, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });
      res.status(200).json({ state: "user created", token });
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
