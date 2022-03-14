const { model, Schema } = require("mongoose");

const HeroModel = new Schema({
  id: { type: Number },
  name: { type: String, required: true },
  slug: { type: String },
  powerstats: {
    intelligence: { type: Number, required: true },
    strength: { type: Number, required: true },
    speed: { type: Number, required: true },
    durability: { type: Number, required: true },
    power: { type: Number, required: true },
    combat: { type: Number, required: true },
  },
  appearance: {
    gender: { type: String, default: "unknown" },
    race: { type: String, default: "unknown" },
    height: [
      { type: String, default: "unknown" },
      { type: String, default: "unknown" },
    ],
    weight: [
      { type: String, default: "unknown" },
      { type: String, default: "unknown" },
    ],
    eyeColor: { type: String, default: "unknown" },
    hairColor: { type: String, default: "unknown" },
  },
  biography: {
    fullName: { type: String, default: "unknown" },
    alterEgos: { type: String, default: "unknown" },
    aliases: [{ type: String, default: "unknown" }],
    placeOfBirth: { type: String, default: "unknown" },
    firstAppearance: { type: String, default: "unknown" },
    publisher: { type: String, default: "unknown" },
    alignment: { type: String, default: "unknown" },
  },
  work: {
    occupation: { type: String, default: "unknown" },
    base: { type: String, default: "unknown" },
  },
  connections: {
    groupAffiliation: { type: String, default: "unknown" },
    relatives: { type: String, default: "unknown" },
  },
  images: {
    xs: { type: String, default: "unknown" },
    sm: { type: String, default: "unknown" },
    md: { type: String, default: "unknown" },
    lg: { type: String, default: "unknown" },
  },
});

const Hero = model("Hero", HeroModel, "heroes");

module.exports = Hero;
