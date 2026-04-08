const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {

  const { email, codename, password } = req.body;

  try {

    // check if codename already exists
    const existingUser = await User.findOne({ codename });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Codename already taken"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
  email,
  codename,
  password: hashedPassword,

  score: 0,
  xp: 0,
  level: 1,
  streak: 1,
  avatar: "",
  completedMissions: []
});

    await user.save();

    res.json({
  success: true,
  user: {
    codename: user.codename,
    avatar: "",
    level: 1,
    xp: 0,
    score: 0,
    streak: 1,
    completedMissions: []
  }
});
  } catch (error) {

  console.error("AUTH ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Server error"
  });

}

});
// LOGIN
router.post("/login", async (req, res) => {

  const { codename, password } = req.body;

  try {

    const user = await User.findOne({ codename });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.json({
    success: false,
    message: "Invalid password"
  });
}

/* -------- DAILY STREAK LOGIC -------- */

const today = new Date().toDateString();
const lastLogin = new Date(user.lastLogin || Date.now()).toDateString();

if (today !== lastLogin) {

  const diffDays =
    (new Date() - new Date(user.lastLogin || Date.now())) /
    (1000 * 60 * 60 * 24);

  if (diffDays <= 1) {
    user.streak += 1;
  } else {
    user.streak = 1;
  }

  user.lastLogin = new Date();
  await user.save();
}

/* -------- SEND USER DATA -------- */

res.json({
  success: true,
  user: {
    codename: user.codename,
    avatar: user.avatar,
    level: user.level,
    xp: user.xp,
    score: user.score,
    streak: user.streak,
    completedMissions: user.completedMissions
  }
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

module.exports = router;