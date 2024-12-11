const express = require("express");
const { Patient, Doctor, Interaction } = require("../db/db");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middle = require("../middleware/auth");
const axios = require("axios");
router.post("/signup", async (req, res) => {
  const { name, email, password, age, gender } = req.body;
  try {
    const exist = await Patient.findOne({ email });
    if (exist) {
      return res.status(400).json({
        msg: "user already exist",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newuser = await Patient.create({
      name,
      email,
      password: hashed,
      age,
      gender,
    });
    await newuser.save();
    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
    res.json({ token, email });
  } catch (error) {
    console.log("signup error", error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET);
    res.json({ token, email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

router.get("/profile", middle, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password");
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile", error });
  }
});

router.get("/doctordetails", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(400).json({ error: "Doctor Not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/interactions", middle, async (req, res) => {
  try {
    const conv = await Interaction.find({ patientId: req.user.id }).populate(
      "doctorId"
    );
    res.json(conv);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/interactions/:doctorId", middle, async (req, res) => {
  try {
    const con = await Interaction.find({
      patientId: req.user.id,
      doctorId: req.params.doctorId,
    });
    res.json(con);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
const formatGeneratedText = (text) => {
  return text
    .replace(/##+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/- /g, "- ")
    .replace(/- /g, "\n- ")
    .replace(/(\d\.)/g, "\n$1")
    .replace(/(\d\.)/g, "\n$1")
    .replace(/\n+/g, " ")
    .trim();
};

const generateContent = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const text = response.data.candidates[0].content.parts[0].text;
    return formatGeneratedText(text);
  } catch (error) {
    console.error("Error generating content:", error);
    return "";
  }
};

const saveInteraction = async (patientId, doctorId, query, response) => {
  const interaction = new Interaction({
    patientId,
    doctorId,
    query,
    response,
    interactionDate: new Date(),
  });
  await interaction.save();
};

router.post("/chat", middle, async (req, res) => {
  const { specialization, query, doctorId } = req.body;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.specialization !== specialization) {
      return res
        .status(404)
        .json({ message: "Doctor not found or specialization does not match" });
    }
    const response = await generateContent(query);
    if (response !== "") {
      await saveInteraction(req.user.id, doctor._id, query, response);
    }
    res.json({ response });
  } catch (error) {
    console.error("Error handling chat:", error);
    res.status(500).send("Error handling chat");
  }
});
module.exports = router;
