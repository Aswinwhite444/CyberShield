const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");


// LOG ACTIVITY
router.post("/log", async (req, res) => {

  try {

    const { codename, action, xp } = req.body;

    const activity = new Activity({
      codename,
      action,
      xp
    });

    await activity.save();

    res.json({ success: true });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// GET FEED
router.get("/feed", async (req, res) => {

  try {

    const activities = await Activity
      .find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(activities);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


module.exports = router;