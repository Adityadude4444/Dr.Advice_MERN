import React, { useState } from "react";
import { Labelbox } from "./minicomponents/Labelbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Signupips {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
}

const Auth = () => {
  const [postips, setpostips] = useState<Signupips>({
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
  });
  const navigator = useNavigate();

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpostips({ ...postips, gender: event.target.value });
  };

  return (
    <div className="w-full p-5 pl-40 flex flex-col gap-2">
      <Labelbox
        label="Name"
        onchange={(e) =>
          setpostips({ ...postips, name: (e.target as HTMLInputElement).value })
        }
        placeholder="John Doe"
      />
      <Labelbox
        label="Email"
        onchange={(e) =>
          setpostips({
            ...postips,
            email: (e.target as HTMLInputElement).value,
          })
        }
        placeholder="johndoe@example.com"
      />
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-2 text-sm text-slate-600">Password</label>
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          type="password"
          onChange={(e) =>
            setpostips({
              ...postips,
              password: (e.target as HTMLInputElement).value,
            })
          }
        />
      </div>
      <Labelbox
        label="Age"
        onchange={(e) =>
          setpostips({
            ...postips,
            age: parseInt((e.target as HTMLInputElement).value, 10),
          })
        }
        placeholder="18"
      />

      <div className="my-2 ">
        <label className="block mb-2 text-sm text-slate-600">Gender</label>
        <div className="flex items-center">
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={postips.gender === "Male"}
              onChange={handleGenderChange}
              className="mr-2"
            />
            Male
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={postips.gender === "Female"}
              onChange={handleGenderChange}
              className="mr-2"
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={postips.gender === "Other"}
              onChange={handleGenderChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>
      <div>
        <h3>
          Already Have account{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              navigator("/signin");
            }}
          >
            Login
          </span>
        </h3>
      </div>
      <button
        className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2.5 bg-[#0070f3] rounded-md text-white transition duration-200 ease-linear  ml-2 max-w-96 mt-2"
        onClick={async () => {
          try {
            const res = await axios.post(
              `${BACKEND_URL}/api/user/signup`,
              postips
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.email);
            navigator("/home");
          } catch (error: any) {
            console.log("Error while logging in: ", error);
          }
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Auth;
