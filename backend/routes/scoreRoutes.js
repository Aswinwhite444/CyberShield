const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save score
router.post("/", async (req, res) => {

  const { codename, score } = req.body;

  try {

    await User.findOneAndUpdate(
      { codename: codename },
      { $inc: { score: score } }
    );

    res.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

// Leaderboard
router.get("/leaderboard", async (req, res) => {

  try {

    const users = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("codename score");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;