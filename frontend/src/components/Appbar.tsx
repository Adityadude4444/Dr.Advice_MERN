import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigator = useNavigate();
  const email = localStorage.getItem("email");
  const initial = email ? email[0].toUpperCase() : "A";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  if (!email) {
    navigator("/");
  }
  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    navigator("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex justify-between items-center mt-3">
      <div
        className="font-bold text-4xl text-[#0070f3] pl-4 pb-3 cursor-pointer"
        onClick={() => {
          navigator("/home");
        }}
      >
        DR. ADVICE
      </div>
      <div className="p-4 mr-2 flex gap-3 items-center">
        <span
          className="text-[#0070f3] hover:text-[rgba(0,118,255,0.9)] font-normal cursor-pointer"
          onClick={() => navigator("/profile")}
        >
          Profile
        </span>
        <div
          className="relative"
          onClick={() => setIsDropdownOpen((prevState) => !prevState)} // Toggle based on previous state
        >
          <div className="rounded-full h-9 w-9 bg-[#0070f3] p-1 text-white text-center flex items-center justify-center cursor-pointer">
            {initial}
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg p-2">
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-600 hover:bg-gray-100 p-2 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
