const express = require("express");

const router = express.Router();

router.post("/detect", (req, res) => {

  const { emailText } = req.body;

  const phishingKeywords = [
  "winner",
  "congratulations",
  "free money",
  "click here",
  "urgent",
  "verify account",
  "password reset",
  "claim reward",
  "bank alert",
  "suspended account",
  "login immediately",
  "confirm identity",
  "update payment",
  "security alert"
];

  const text = emailText.toLowerCase();

  let detected = false;

  phishingKeywords.forEach(word => {
    if (text.includes(word)) {
      detected = true;
    }
  });

  if (detected) {
    res.json({
      result: "⚠️ Suspicious phishing email detected"
    });
  } else {
    res.json({
      result: "✅ Email looks safe"
    });
  }

});

module.exports = router;