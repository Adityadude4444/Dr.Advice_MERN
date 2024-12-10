import React from "react";
import AppbarforLand from "../components/AppbarforLand";
import DacoImage from "../assets/Daco_5430540.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col">
      <AppbarforLand />
      <div className="grid grid-cols-2 p-10">
        <div className="flex justify-center items-center">
          <img
            src={DacoImage}
            alt="Healthcare Illustration"
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-start p-10 bg-white">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Your Health, Our Priority: <br /> Expert Care at Your Fingertips
          </h1>
          <button
            className=" shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2.5 bg-[#0070f3] rounded-md text-white transition duration-200 ease-linear"
            onClick={() => {
              navigator("/signup");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
