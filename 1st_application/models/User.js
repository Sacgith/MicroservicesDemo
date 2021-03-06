const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
