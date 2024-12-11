import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Doctortemp from "../components/minicomponents/Doctortemp";
import { useNavigate } from "react-router-dom";

interface Doctor {
  name: string;
  specialization: string;
  image: string;
  _id: string;
}

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    async function doctordetails() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/user/doctordetails`
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    }
    doctordetails();
  }, []);

  return (
    <div className="flex flex-col">
      <Appbar />
      <div className="w-full h-[100px] bg-blue-500 mt-3">
        <h1 className="text-4xl font-bold text-center mt-[25px] text-white">
          OUR DOCTORS
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 p-4 mt-2">
        {doctors.map((doctor, index) => (
          <Doctortemp
            key={index}
            name={doctor.name}
            specialization={doctor.specialization}
            image={doctor.image}
            onclick={() => {
              navigator(`/doctor/${doctor._id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
