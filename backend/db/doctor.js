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
        name: "Dr. John",
        specialization: "Skin",
        image:
          "https://img.freepik.com/premium-photo/portrait-smiling-doctor-with-stethoscope-corridor-hospital_948103-151.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph",
      },
      {
        name: "Dr. Jane",
        specialization: "Hair",
        image:
          "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph",
      },
      {
        name: "Dr. Smith",
        specialization: "Dental",
        image:
          "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?size=626&ext=jpg&ga=GA1.1.493883763.1720994992&semt=sph",
      },
      {
        name: "Dr. Miller",
        specialization: "Cardiology",
        image:
          "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
      },
    ];

    await Doctor.insertMany(doctors);
    console.log("Dummy doctors inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
