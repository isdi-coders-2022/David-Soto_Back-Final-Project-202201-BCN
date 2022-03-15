const { model, Schema } = require("mongoose");

const UserModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  favorite: { type: String },
  friends: { type: String },
});

const User = model("User", UserModel, "users");

module.exports = User;
