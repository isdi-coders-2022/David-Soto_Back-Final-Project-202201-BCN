const express = require("express");
const {
  getAllHeroes,
  createHero,
  deleteHero,
} = require("../controllers/heroController");



const router = express();

router.get("/listAll", getAllHeroes);
router.post("/createNew", createHero);
router.post("/deleteHero/:id", deleteHero);

module.exports = router;
