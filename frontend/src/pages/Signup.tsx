import React from "react";
import DacoImage from "../assets/Daco_5430540.png";
import Auth from "../components/Auth";
const Signup = () => {
  return (
    <div>
      <div className="grid grid-cols-2 p-10">
        <div className="flex justify-center items-center">
          <img
            src={DacoImage}
            alt="Healthcare Illustration"
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-10 bg-white">
          <div className="font-bold text-4xl text-[#0070f3] pl-4 pb-3 text-center">
            Sign Up
          </div>
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Signup;
