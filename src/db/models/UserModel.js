const { model, Schema } = require("mongoose");

const UserModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  favoriteHeroes: { type: Object },
  createdHeroes: { type: Object },
});

const User = model("User", UserModel, "users");

module.exports = User;
