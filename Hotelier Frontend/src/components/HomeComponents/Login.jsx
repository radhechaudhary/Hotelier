import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "userId") {
      setUserId(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    // sending the formData to backend
    axios
      .post("http://localhost:4000/login", { 
        userId: userId,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "success") {
          //setting the values to localStorage  
          localStorage.setItem("token", res.data.values.token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("staff", JSON.stringify(res.data.values.staff));
          localStorage.setItem("rooms", JSON.stringify(res.data.values.rooms));
          localStorage.setItem("hotel", res.data.values.hotel);
          localStorage.setItem(
            "weekData",
            JSON.stringify(res.data.values.report.weekData)
          );
          localStorage.setItem(
            "monthData",
            JSON.stringify(res.data.values.report.monthData)
          );
          localStorage.setItem(
            "yearData",
            JSON.stringify(res.data.values.report.yearData)
          );
          navigate("/dashboard", { replace: true });
        } else {
          setError(res.data.status); // else set the error what we got from backend
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <form
      onSubmit={(e) => submitForm(e)}
      className=" z-10 bg-gray-50 p-8 flex flex-col  max-h-fit gap-[20px] w-[85%] max-w-[400px]  md:w-[400px] rounded-2xl  shadow-black-300 shadow-xl "
    >
      <h2 className="text-center text-3xl font-bold">Login !</h2>
      <div className="flex flex-col">
        <label for="UserId">User Id:</label>
        <input
          name="userId"
          value={userId}
          onChange={handleChange}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          id="userID"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label for="password">Password:</label>
        <input
          name="password"
          value={password}
          onChange={handleChange}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          type="password"
          id="password"
        />
        {error ? <p className="text-rose-700 text-xs">**{error}**</p> : <p></p>}
        <Link
          to="register"
          className="text-blue-800 text-xs text-right font-medium"
        >
          New user? Register Here!!
        </Link>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2  rounded-[400px] active:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
