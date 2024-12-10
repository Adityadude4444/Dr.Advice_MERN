import DacoImage from "../assets/Daco_5430540.png";
import Authlogin from "../components/Authlogin";
const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-2 p-11">
        <div className="flex justify-center items-center mt-14">
          <img
            src={DacoImage}
            alt="Healthcare Illustration"
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-10 bg-white mt-10">
          <div className="font-bold text-4xl text-[#0070f3] pl-4 pb-3 text-center">
            Sign In
          </div>
          <Authlogin />
        </div>
      </div>
    </div>
  );
};

export default Signin;
