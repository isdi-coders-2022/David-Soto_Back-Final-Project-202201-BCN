const { model, Schema } = require("mongoose");

const createdHeroModel = new Schema({
  name: { type: String, required: true },
  alias: { type: String, required: true },
  creator: { type: String, required: true },
  powerstats: {
    intelligence: { type: Number, required: true },
    strength: { type: Number, required: true },
    speed: { type: Number, required: true },
    durability: { type: Number, required: true },
    power: { type: Number, required: true },
    combat: { type: Number, required: true },
  },
});

const CreatedHero = model("CreatedHero", createdHeroModel, "createdHeroes");

module.exports = CreatedHero;
