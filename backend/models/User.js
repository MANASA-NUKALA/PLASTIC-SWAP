const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // 👇 New fields for PlasticSwap stats
  recycledPlastics: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
  activities: [
    {
      description: { type: String },
      points: { type: Number },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
