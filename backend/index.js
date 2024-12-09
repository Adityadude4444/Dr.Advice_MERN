require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userroute = require("./routes/auth.route");
const app = express();
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

app.use("/api/user", userroute);

app.listen(5000, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB and running on port 5000");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
});
