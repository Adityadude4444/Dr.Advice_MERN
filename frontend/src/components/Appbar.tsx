import React from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigator = useNavigate();
  const email = localStorage.getItem("email");
  const initial = email ? email[0].toUpperCase() : "A";

  return (
    <div className="flex justify-between items-center mt-3">
      <div className="font-bold text-4xl text-[#0070f3] pl-4 pb-3">
        DR. ADVICE
      </div>
      <div className="p-4 mr-2 flex gap-3 items-center">
        <span
          className="text-[#0070f3] hover:text-[rgba(0,118,255,0.9)] font-normal"
          onClick={() => navigator("/profile")}
        >
          Profile
        </span>
        <span
          className="text-[#0070f3] hover:text-[rgba(0,118,255,0.9)] font-normal"
          onClick={() => navigator("/chat")}
        >
          Chat
        </span>
        <div className="rounded-full h-9 w-9 bg-[#0070f3] p-1 text-white text-center flex items-center justify-center">
          {initial}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
