require("dotenv").config();
const mongoose = require("mongoose");
const { Doctor } = require("./db");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    const doctors = [
      {
        name: "Dr. Roman",
        specialization: "Psychiatry",
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
      },
      {
        name: "Dr. Shreya",
        specialization: "Gynecology",
        image:
          "https://t4.ftcdn.net/jpg/03/20/74/45/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO.jpg",
      },
      {
        name: "Dr. William",
        specialization: "Urology",
        image:
          "https://st4.depositphotos.com/13193658/41424/i/450/depositphotos_414248418-stock-photo-positive-ophthalmologist-hand-pocket-wearing.jpg",
      },
      {
        name: "Dr. Jack",
        specialization: "Gastroenterology",
        image:
          "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?semt=ais_hybrid",
      },
    ];

    await Doctor.insertMany(doctors);
    console.log("Dummy doctors inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
