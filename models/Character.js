const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
  name: String,
  description: String,
});

module.exports = Character;
