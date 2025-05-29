import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function RegisterForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Hotel: "",
    Mail: "",
    Mobile: "",
    Address: "",
    Password: "",
  });
  const [otp, setOtp] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    if (e.target.name !== "OTP")
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    else setOtp(e.target.value);
  };
  const SendOtp = () => {
    alert("Otp sent to your email");
    setOtpSent(true);
    axios.post();
  };
  const VerifyOtp = () => {
    setOtpVerified(true);
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/signup", formData) // sending form Data to backend
      .then((res) => {
        if (res.data.message === "success") { 
          //if the backend message is success save the data to localStorage and navigate to dashboard  
          localStorage.setItem("userId", res.data.user_id);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("hotel", formData.Hotel);
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <form
      onSubmit={(e) => submitForm(e)}
      className=" z-10 bg-gray-50 p-8 flex flex-col  max-h-fit gap-[10px] w-[85%] max-w-[400px]  md:w-[450px] s:ww-[400px] rounded-2xl  shadow-black-300  shadow-lg "
    >
      <h2 className="text-center text-2xl font-bold">Join Our Family !</h2>
      <div className="flex flex-col">
        <label for="Hotel">Hotel Name:</label>
        <input
          name="Hotel"
          onChange={handleChange}
          value={formData.Hotel}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          id="Hotel"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label for="Mail">email:</label>
        <input
          name="Mail"
          value={formData.Mail}
          onChange={handleChange}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          type="email"
          id="Mail"
        />
      </div>
      {!otpVerified ? (
        <div
          className={`w-[100%] flex ${
            otpSent ? "flex-row-reverse justify-end" : ""
          } justify-start gap-2`}
        >
          <button
            onClick={!otpSent ? SendOtp : VerifyOtp}
            className="p-1 rounded-2xl bg-rose-500 text-white active:bg-rose-700"
          >
            {otpSent ? "Verify" : "Get OTP"}
          </button>
          {otpSent ? (
            <input
              name="OTP"
              value={otp}
              className="border w-[100px] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
              type="tel"
            />
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col">
        <label for="Mobile">Mobile:</label>
        <input
          name="Mobile"
          value={formData.Mobile}
          onChange={handleChange}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          type="tel"
          id="Mobile"
        />
      </div>
      <div className="flex flex-col">
        <label for="Address">Address:</label>
        <textarea
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          type="text"
          id="Address"
        />
      </div>
      <div className="flex flex-col">
        <label for="Password">Password:</label>
        <input
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          type="password"
          id="Password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2  rounded-[400px] active:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
