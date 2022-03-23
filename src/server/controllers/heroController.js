const debug = require("debug")("ultrawarriors: controllers:");
const chalk = require("chalk");
const CreatedHero = require("../../db/models/CreatedHeroModel");
const Hero = require("../../db/models/HeroModel");
const User = require("../../db/models/UserModel");

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

const getCreatedHeroes = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById({ _id }).populate("createdHeroes");
    res.status(200).json(user.createdHeroes);
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

const createHero = async (req, res, next) => {
  const createdHero = req.body;
  const { name } = createdHero;
  const { _id, createdHeroes } = req.user;
  try {
    const alreadyHero = await CreatedHero.findOne({ name });
    const user = await User.findById({ _id });
    if (!alreadyHero) {
      const newHero = await CreatedHero.create(createdHero);
      user.createdHeroes = [createdHeroes, newHero.id];
      await User.findOneAndUpdate({ _id }, user);
      res.status(201);
      res.json(newHero);
    } else {
      const error = new Error("This hero already exist");
      error.status = 400;
      next(error);
    }
  } catch (error) {
    error.message = "Hero was not created, incorrect format";
    error.status = 400;
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
    error.status = 404;
    next(error);
  } catch (error) {
    error.message = "Bad request triying to delete hero";
    error.status = 400;
    next(error);
  }
};

const addFavoriteHeroes = async (req, res, next) => {
  const { _id } = req.user;
  const newHero = req.body;
  try {
    const user = await User.findById({ _id });
    user.favoriteHeroes = [user.favoriteHeroes, newHero.id];
    await User.findOneAndUpdate({ _id }, user);
    res.status(200).json(user.favoriteHeroes);
  } catch (error) {
    debug(chalk.red("Error"));
    error.status = 400;
    next(error);
  }
};

module.exports = {
  getAllHeroes,
  createHero,
  deleteHero,
  getCreatedHeroes,
  addFavoriteHeroes,
};
