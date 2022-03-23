const { model, Schema } = require("mongoose");
const CreatedHero = require("./CreatedHeroModel");

const UserModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  favoriteHeroes: [{ type: Schema.Types.ObjectId, ref: "HeroModel" }],
  createdHeroes: [{ type: Schema.Types.ObjectId, ref: CreatedHero }],
});

const User = model("User", UserModel, "users");

module.exports = User;
