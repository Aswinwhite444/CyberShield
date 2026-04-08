const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({

  codename: String,

  action: String,

  xp: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Activity", ActivitySchema);