import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCustomers,
  setOccupiedRooms,
  setRooms,
  setWeekData,
  setMonthData,
  setYearData,
} from "../../features/data.Slice";
import axios from "axios";

function EntryForm({ setForms }) {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const occupiedRooms = useSelector((state) => state.occupiedRooms);
  const currentCustomers = useSelector((state) => state.currentCustomers);
  const weekData = useSelector((state) => state.weekData);
  const monthData = useSelector((state) => state.monthData);
  const yearData = useSelector((state) => state.yearData);
  const [formData, setFormData] = useState({
    name: "",
    members: 1,
    tel: "",
    roomNo: "",
    idTYpe: "",
    idNo: "",
    price: "",
  });
 
  //....................Submit the form ......................//
  const submitForm = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    if (formData.roomNo in occupiedRooms) { //check if room i s vacant or occupied
      alert("Room already occupied");
      return;
    }
    if (!rooms.includes(formData.roomNo)) {
      const newRooms = [...rooms, formData.roomNo];
      newRooms.sort();
      dispatch(setRooms(newRooms)); // adding rooms if room not present in room list
    }
    dispatch(
      setCurrentCustomers([
        ...currentCustomers,
        { ...formData, entryDate: formattedDate, entryTime: currentTime }, // adding this new customer to currentCustomers
      ])
    );
    dispatch( //adding this room to occupied Rooms
      setOccupiedRooms({
        ...occupiedRooms,
        [formData.roomNo]: {
          customerName: formData.name,
          price: formData.price,
          entryDate: formattedDate,
        },
      })
    );

    var data = [...weekData];
    const date = new Date();
    data[date.getDay()] = data[date.getDay()] + 1; //increasing entries count by 1 on the day of the week
    dispatch(setWeekData(data));
    data = [...monthData];
    data[date.getDate()] = data[date.getDate()] ;
    dispatch(setMonthData(data));
    data = [...yearData];
    data[date.getMonth()] = data[date.getMonth()] + 1; // increasing the count by 1 for current year month
    dispatch(setYearData(data));

    axios
      .post(
        "http://localhost:4000/update-report", //updating the the report of the hotel and save to backend 
        { weekData: weekData, monthData: monthData, yearData: yearData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.log(err.message);
      });
    
    setForms({ entry: false, checkout: false }); //close the form
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <motion.form
      id='entry-form'  
      onSubmit={submitForm}
      initial={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
      animate={{ height: "auto", paddingTop: 20, paddingBottom: 20 }}
      exit={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
      className="w-[300px] flex flex-col gap-1 bg-blue-50 p-5 rounded-lg overflow-hidden shadow-slate-600 shadow-md"
    >
      <div className="flex flex-col">
        <label for="fullName"> Full Name:</label>
        <input
          required
          onChange={handleChange}
          name="name"
          value={formData.name}
          className="border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          id="fullName"
          type="text"
        />
      </div>
      <div className="flex gap-2 flex-shrink">
        <div className="flex flex-col flex-1">
          <label for="Memebers"> Members:</label>
          <input
            required
            value={formData.members}
            name="members"
            onChange={handleChange}
            className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1 "
            id="Members"
            type="number"
            defaultValue={1}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label for="RoomNo"> Room-No:</label>
          <input
            required
            value={formData.roomNo}
            name="roomNo"
            onChange={handleChange}
            className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
            id="RoomNo"
            type="number"
          />
        </div>
      </div>
      <div className="flex gap-2 flex-shrink">
        <div className="flex flex-col flex-2">
          <label for="IdType"> Id Type:</label>
          <select
            onChange={handleChange}
            name="idType"
            value={formData.idTYpe}
            className="border w-[100%] border-slate-950 rounded-xl text-[14px] active:outline-none active:border-collapse px-1 py-1 "
            id="IdType"
          >
            <option value="aadharCard">Aadhar Card</option>
            <option value="voterCard">Voter Id</option>
            <option value="DL">Driver License</option>
            <option value="panCard">Pan Card</option>
          </select>
        </div>
        <div className="flex flex-col flex-3">
          <label for="IdNo"> Id-No:</label>
          <input
            required
            name="idNo"
            value={formData.idNo}
            onChange={handleChange}
            className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
            id="IdNo"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col flex-2">
        <label for="Price">Price:</label>
        <input
          required
          value={formData.price}
          name="price"
          onChange={handleChange}
          className="border w-[50%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          id="Price"
          type="number"
        />
      </div>
      <div className="flex flex-col">
        <label for="tel"> Mobile:</label>
        <input
          required
          value={formData.tel}
          name="tel"
          onChange={handleChange}
          className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          id="tel"
          type="number"
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2  rounded-[400px] active:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
    </motion.form>
  );
}

export default EntryForm;
