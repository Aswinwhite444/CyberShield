const express = require("express");
const router = express.Router();
const User = require("../models/User");

// save avatar
router.post("/avatar", async (req, res) => {

  const { codename, avatar } = req.body;

  try {

    await User.findOneAndUpdate(
      { codename: codename },
      { avatar: avatar }
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});



router.post("/update-profile", async (req, res) => {

  const { codename, avatar } = req.body;

  try {

    const user = await User.findOneAndUpdate(
      { codename },
      { avatar },
      { new: true }
    );

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

router.post("/update-streak", async (req, res) => {

  const { codename } = req.body;

  try {

    await User.findOneAndUpdate(
      { codename },
      { $inc: { streak: 1 } }
    );

    res.json({ success: true });

  } catch (err) {

    res.status(500).json({ success: false });

  }

});


// UPDATE XP
router.post("/update-xp", async (req, res) => {

  const { codename, xp } = req.body;

  try {

    const user = await User.findOne({ codename });

    if (!user) {
      return res.json({ success: false });
    }

    // add XP
    user.xp += xp;

    // calculate level
    const XP_PER_LEVEL = 1000;
    user.level = Math.floor(user.xp / XP_PER_LEVEL) + 1;

    await user.save();

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// SAVE COMPLETED MISSION
router.post("/save-mission", async (req, res) => {

  const { codename, missionId } = req.body;

  try {

    const user = await User.findOne({ codename });

    if (!user) {
      return res.json({ success: false });
    }

    // prevent duplicates
    if (!user.completedMissions.includes(missionId)) {
      user.completedMissions.push(missionId);
    }

    await user.save();

    res.json({ success: true });

  } catch (error) {

    console.error(error);
    res.status(500).json({ success: false });

  }

});

module.exports = router;
