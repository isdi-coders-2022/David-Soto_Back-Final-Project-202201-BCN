const express = require("express");
const {
  getAllHeroes,
  createHero,
  getCreatedHeroes,
} = require("../controllers/heroController");

const router = express();

router.get("/listAll", getAllHeroes);
router.get("/created", getCreatedHeroes);
router.post("/createNew", createHero);

module.exports = router;
