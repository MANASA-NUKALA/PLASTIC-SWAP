const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  contact: { type: String, required: true },
  image: { type: String },
  location: { type: String },
});


module.exports = mongoose.model("Item", ItemSchema);
