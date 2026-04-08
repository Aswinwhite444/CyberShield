const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const phishingRoutes = require("./routes/phishingRoutes");
const activityRoutes = require("./routes/activityRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/score", require("./routes/scoreRoutes"));
app.use("/api/phishing", phishingRoutes);
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));

app.get("/", (req, res) => {
  res.send("CyberShield Backend Running");
});

mongoose.connect("mongodb://127.0.0.1:27017/cybershield")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});