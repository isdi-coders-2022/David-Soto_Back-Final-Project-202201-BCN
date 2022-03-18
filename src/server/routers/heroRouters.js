const express = require("express");
const { getAllHeroes } = require("../controllers/heroController");

const router = express();

router.get("/listAll", getAllHeroes);

module.exports = router;
