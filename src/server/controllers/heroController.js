const debug = require("debug")("ultrawarriors: controllers:");
const chalk = require("chalk");
const CreatedHero = require("../../db/models/CreatedHeroModel");
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

const createHero = async (req, res, next) => {
  const hero = req.body;
  try {
    const alreadyHero = await CreatedHero.findOne(hero.username);
    if (!alreadyHero) {
      const newHero = await CreatedHero.create(hero);
      res.status(201);
      res.json(newHero);
    } else {
      const error = new Error("This hero already exist");
      error.code = 400;
      next(error);
    }
  } catch (error) {
    error.message = "Hero was not created";
    error.code = 400;
    next(error);
  }
};

const deleteHero = async (req, res, next) => {
  const { id } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const _id = id;
  try {
    const deletedHero = await CreatedHero.findByIdAndDelete(_id);
    if (deletedHero) {
      res.json(deletedHero.id);
      return;
    }
    const error = new Error("ID or hero not found");
    error.code = 404;
    next(error);
  } catch (error) {
    error.message = "Bad request triying to delete hero";
    error.code = 400;
    next(error);
  }
};

module.exports = { getAllHeroes, createHero, deleteHero };
