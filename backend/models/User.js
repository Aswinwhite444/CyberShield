const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  email: String,

  codename: {
    type: String,
    unique: true
  },

  password: String,

  avatar: {
    type: String,
    default: ""
  },

  level: {
    type: Number,
    default: 1
  },

  xp: {
    type: Number,
    default: 0
  },

  score: {
    type: Number,
    default: 0
  },

  streak: {
    type: Number,
    default: 1
  },
  
//lst mdfd cd
  lastLogin: {
  type: Date,
  default: Date.now
},

  completedMissions: {
    type: Array,
    default: []
  }

});

module.exports = mongoose.model("User", UserSchema);