const express = require("express");
const {
  getAllHeroes,
  createHero,
  deleteHero,
  getCreatedHeroes,
  addFavoriteHeroes,
} = require("../controllers/heroController");

const router = express();

router.get("/listAll", getAllHeroes);
router.get("/created", getCreatedHeroes);
router.post("/createNew", createHero);
router.post("/deleteHero/:id", deleteHero);
router.post("/favorite/:id", addFavoriteHeroes);

module.exports = router;
