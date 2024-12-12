import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { interactionprops } from "./Profile";
import { Profilequery } from "../components/minicomponents/Profilequery";
import Doctorchat from "../components/minicomponents/Doctorchat";

interface DoctorProps {
  name: string;
  specialization: string;
  image: string;
  _id: string; // Add _id to the DoctorProps interface for clarity
}
export interface interactionprops2 {
  query: string;
  response: string;
  interactionDate: string;
}

const Doctormain = () => {
  const [doctorid, setDoctorId] = useState<DoctorProps>();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [interactions, setinteractions] = useState<interactionprops2[]>([]);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setloading] = useState(false); // Make response type a string or null
  const { id } = useParams<{ id: string }>();

  async function getRes(query: string, doctor: DoctorProps) {
    try {
      setloading(true);
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/user/chat`,
        {
          specialization: doctor.specialization,
          doctorId: doctor._id,
          query,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResponse(response.data.response);
      setloading(false);
      console.log("Response received:", response.data.response);
    } catch (error) {
      console.error("Error sending query:", error);
    }
  }

  useEffect(() => {
    async function details() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        if (!id) {
          console.error("No ID found in route parameters.");
          return;
        }
        const res2 = await axios.get(
          `${BACKEND_URL}/api/user/interactions/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setinteractions(res2.data);

        const res = await axios.get(`${BACKEND_URL}/api/user/doctor/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setDoctorId(res.data);
        console.log("Doctor details:", res.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    }

    details();
  }, [id]);

  return (
    <div className="flex flex-col relative">
      <Appbar />
      <div className="mx-[15%]">
        <div className="mx-20 max-w-5xl bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out p-4 my-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20">
                <img
                  src={doctorid?.image}
                  alt="Doctor"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">{doctorid?.name}</h1>
                <p className="text-sm text-gray-600">
                  {doctorid?.specialization}
                </p>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsChatOpen(true)} // Open chat
            >
              Chat
            </button>
          </div>
          <h3 className="font-medium mt-5">
            {doctorid?.name} is a skilled professional dedicated to diagnosing,
            treating, and preventing illnesses, thereby saving lives and
            promoting health specialized in {doctorid?.specialization}
          </h3>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-16">
          <h1 className="font-bold text-2xl text-[#0070f3] mb-5">
            Conversation with {doctorid?.name}
          </h1>
          <div className="flex flex-col">
            <div className="p-5">
              <div className="flex flex-col gap-5">
                {interactions.map((interaction, index) => (
                  <Doctorchat
                    key={index}
                    query={interaction.query}
                    response={interaction.response}
                    interactionDate={interaction.interactionDate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Layer */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md max-h-96 p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsChatOpen(false)} // Close chat
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">
              Chat with {doctorid?.name}
            </h2>
            <div className="flex items-center gap-2 border-t pt-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query
                placeholder="Type your message..."
                className="flex-grow border rounded-lg p-2 focus:outline-none"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => getRes(query, doctorid!)} // Pass query and doctor details
              >
                Send
              </button>
            </div>
            {/* Display the response from doctor */}
            {loading ? (
              <div className="mt-12">Loading...</div>
            ) : (
              <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto max-h-56">
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctormain;
