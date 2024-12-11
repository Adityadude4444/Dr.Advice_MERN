import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Profilequery } from "../components/minicomponents/Profilequery";

interface userdataprop {
  name: string;
  email: string;
  gender: string;
  age: number;
}

export interface interactionprops {
  query: string;
  specialization: string;
  doctorId: {
    name: string;
    specialization: string;
  };
}

const Profile = () => {
  const [userdata, setuserdata] = useState<userdataprop>();
  const [interactions, setinteractions] = useState<interactionprops[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function details() {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: token } : {};

        const [response1, response2] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/user/profile`, { headers }),
          axios.get(`${BACKEND_URL}/api/user/interactions`, { headers }),
        ]);

        setuserdata(response1.data);
        setinteractions(response2.data);
      } catch (error) {
        console.error("Error fetching profile or interactions:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    }
    details();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="flex flex-col">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mx-14 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out p-4 my-10">
          <h1 className="font-bold text-2xl text-[#0070f3] mb-5">Profile</h1>
          <div className="grid grid-cols-2 gap-3">
            <h3>
              <span className="font-semibold">Name: </span>
              {userdata?.name}
            </h3>
            <h3>
              <span className="font-semibold">Email: </span>
              {userdata?.email}
            </h3>
            <h3>
              <span className="font-semibold">Age: </span>
              {userdata?.age}
            </h3>
            <h3>
              <span className="font-semibold">Gender: </span>
              {userdata?.gender}
            </h3>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mx-16">
            <h1 className="font-bold text-2xl text-[#0070f3] mb-5">
              Previous queries
            </h1>
            <div className="flex flex-col">
              <div className="p-5">
                <div className="flex flex-col gap-5">
                  {interactions.map((interaction, index) => (
                    <Profilequery
                      key={index}
                      name={interaction.doctorId.name}
                      specialization={interaction.doctorId.specialization}
                      query={interaction.query}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
