const debug = require("debug")("ultrawarriors: controllers:");
const chalk = require("chalk");

const Hero = require("../../db/models/HeroModel");

const getAllHeroes = async (req, res, next) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json({ heroes });
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

module.exports = getAllHeroes;
