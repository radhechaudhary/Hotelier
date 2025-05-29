import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Register from "./components/HomeComponents/Register";
import Topbar from "./components/Functionality Components/Topbar";
import Sidebar from "./components/Functionality Components/sideBar";
import DashBoard from "./components/Functionality Components/DashBoard";
import Rooms from "./components/Functionality Components/Rooms";
import Customers from "./components/Functionality Components/Customers";
import Entries from "./components/Functionality Components/entries";
import Protected from "./Protected";
import Staff from "./components/Functionality Components/staff";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setLoggedIn,
  setCurrentCustomers,
  setRooms,
  setOccupiedRooms,
  setStaff,
  setWeekData,
  setMonthData,
  setYearData,
} from "./features/data.Slice";

import axios from "axios";
import Navbar from "./components/HomeComponents/Navbar";
import { AnimatePresence } from "framer-motion";
import Report from "./components/Functionality Components/report";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.loggedIn);
  const currentCustomers = useSelector((state) => state.currentCustomers);
  const rooms = useSelector((state) => state.rooms);
  const occupiedRooms = useSelector((state) => state.occupiedRooms);
  const staff = useSelector((state) => state.staff);
  const weekData = useSelector((state) => state.weekData);
  const monthData = useSelector((state) => state.monthData);
  const yearData = useSelector((state) => state.yearData);

  const location = useLocation();

  useEffect(() => {
    //useEffect which runs when location changeds
    const path = [
      "/dashboard",
      "/customers",
      "/rooms",
      "/staff",
      "/entries",
      "/report",
    ];
    if (loggedIn && !path.includes(location.pathname)) {
      navigate("/dashboard", { replace: true });
    }
    if (
      !loggedIn &&
      localStorage.getItem("userId") &&
      localStorage.getItem("token")
    ) {
      //logging again with the token stored locally
      dispatch(setLoggedIn(true));
      if (localStorage.getItem("currentCustomers")) {
        dispatch(
          setCurrentCustomers(
            JSON.parse(localStorage.getItem("currentCustomers"))
          )
        );
      }
      if (localStorage.getItem("rooms")) {
        dispatch(setRooms(JSON.parse(localStorage.getItem("rooms"))));
      }
      if (localStorage.getItem("occupiedRooms")) {
        dispatch(
          setOccupiedRooms(JSON.parse(localStorage.getItem("occupiedRooms")))
        );
      }
      if (localStorage.getItem("staff")) {
        dispatch(setStaff(JSON.parse(localStorage.getItem("staff"))));
      }
      if (localStorage.getItem("weekData")) {
        dispatch(setWeekData(JSON.parse(localStorage.getItem("weekData"))));
      }
      if (localStorage.getItem("monthData")) {
        dispatch(setMonthData(JSON.parse(localStorage.getItem("monthData"))));
      }
      if (localStorage.getItem("yearData")) {
        dispatch(setYearData(JSON.parse(localStorage.getItem("yearData"))));
      }
      if (!path.includes(location.pathname)) navigate("/dashboard"); // navigate to dashboard if not refreshing
    }
  }, [location]);

  useEffect(() => {
    // set the data to locally when any of it changes
    localStorage.setItem("currentCustomers", JSON.stringify(currentCustomers));
    localStorage.setItem("occupiedRooms", JSON.stringify(occupiedRooms));
    localStorage.setItem("staff", JSON.stringify(staff));
    localStorage.setItem("weekData", JSON.stringify(weekData));
    localStorage.setItem("monthData", JSON.stringify(monthData));
    localStorage.setItem("yearData", JSON.stringify(yearData));
  }, [currentCustomers, staff]);

  useEffect(() => {
    // update Rooms in backend when room changes in frontEnd
    if (loggedIn && localStorage.getItem("token")) {
      axios
        .post(
          "http://localhost:4000/update-rooms",
          { rooms: rooms },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  return (
    <>
      {loggedIn ? (
        <div className="flex flex-col w-screen flex-grow max-h-screen text-gray-800 font-poppins bg-blue-200">
          <Topbar />
          <div className="flex w-screen flex-grow">
            <Sidebar />
            <AnimatePresence>
              <Routes>
                <Route element={<Protected />}>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/entries" element={<Entries />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/report" element={<Report />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <>
          {location.pathname === "/" || location.pathname === "/signup" ? (
            <Navbar />
          ) : null}
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Register />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default App;
