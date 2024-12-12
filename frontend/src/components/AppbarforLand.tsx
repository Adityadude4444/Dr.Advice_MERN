import { useNavigate } from "react-router-dom";

const AppbarforLand = () => {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center mt-3">
      <div
        className="font-bold text-4xl text-[#0070f3] pl-4 pb-3 cursor-pointer"
        onClick={() => {
          navigator("/");
        }}
      >
        DR. ADVICE
      </div>
      <div className="p-4 mr-2">
        <button
          className=" shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-10 py-2.5 bg-[#0070f3] rounded-md text-white transition duration-200 ease-linear"
          onClick={() => {
            navigator("/signup");
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default AppbarforLand;
