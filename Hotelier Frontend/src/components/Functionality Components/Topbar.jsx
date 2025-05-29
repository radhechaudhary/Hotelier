import  {useState } from "react";
import img from "../../assets/react.svg";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setSidebar, setLoggedIn } from "../../features/data.Slice";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorIcon from "@mui/icons-material/Error";
import {useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar); // state for visibilityof sideBar
  const [warning, setWarning] = useState();
  
  const handleClick = () => { // handle click function for handling the visibility of sideBar on smaller screens
    dispatch(setSidebar(!sideBar)); 
  };

  const logout = () => { 
    //remove all localstorage values from the browser
    localStorage.removeItem("rooms");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("currentCustomers");
    localStorage.removeItem("staff");
    localStorage.removeItem("occupiedRooms");
    localStorage.removeItem("hotel");
    localStorage.removeItem("weekData");
    localStorage.removeItem("monthData");
    localStorage.removeItem("yearData");
    dispatch(setLoggedIn(false));
    navigate("/", { replace: true }); //navigating back to the home page
  };

  return (
    <div className="z-[3] bg-blue-200 w-screen flex justify-between items-center h-[60px] px-5 text-slate-700 ">
      <div
        onClick={handleClick}
        className="absolute top-[60px] left-0 p-2 box-content bg-blue-200  flex flex-col w-[20px] h-[16px] rounded-b-lg md:hidden  items-center justify-between  cursor-pointer active:scale-[0.95]"
      >
        <motion.div
          animate={{ originX: "left", rotateZ: `${sideBar ? "45deg" : "0"}` }}
          className="w-full h-[2px] bg-slate-700"
        ></motion.div>
        <motion.div
          className={`w-full h-[2px] bg-slate-700 ${sideBar ? "hidden" : ""} `}
        ></motion.div>
        <motion.div
          animate={{ originX: "left", rotateZ: `${sideBar ? "-45deg" : "0"}` }}
          className="w-full h-[2px] bg-slate-700"
        ></motion.div>
      </div>
      <div className="flex gap-1 items-center">
        <img src={img} />
        <h2 className="font-bold">Hotelier</h2>
      </div>
      <div className="flex gap-2 items-center">
        <h3 className="font-semibold">{localStorage.getItem("hotel")}</h3>
        <button
          onClick={() => setWarning(true)}
          className="bg-rose-500 p-1 active:scale-95 text-white font-medium flex items-center gap-1 active:bg-rose-700 rounded-md"
        >
          LogOut
          <LogoutIcon />
        </button>
      </div>
      {warning ? (
        <motion.div // modal which appears to confirm logout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn" }}
          className="z-[1000] top-0 left-0 absolute w-screen h-screen bg-black/70 backdrop-blur-sm flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col gap-5 justify-center items-center absolute w-[350px] bg-slate-200 rounded-3xl px-4 py-6 shadow-md shadow-black"
          >
            <ErrorIcon /> 
            <div className="w-full">
              <p className="text-slate-700 font-medium w-full text-left">
                Are you Sure You want to logout ??
              </p>
              <p className="text-slate-700 font-medium">
                All your currentCustomers data will be gone!!
              </p>
            </div>
            <div className="flex w-full justify-center gap-2">
              <button
                onClick={logout}
                className="w-20 bg-rose-500 text-white rounded-full p-1 active:bg-rose-700 active:scale-95"
              >
                Logout
              </button>
              <button
                onClick={() => setWarning(false)}
                className="w-20 bg-slate-500 text-white rounded-full p-1 active:bg-slate-700 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
}

export default Topbar;
