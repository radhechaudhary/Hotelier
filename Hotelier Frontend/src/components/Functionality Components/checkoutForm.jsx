import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCustomers,
  setOccupiedRooms,
} from "../../features/data.Slice";
import { motion } from "framer-motion";
import axios from "axios";

function CheckoutForm({ setForms }) {
  const dispatch = useDispatch();
  const occupiedRooms = useSelector((state) => state.occupiedRooms);
  const currentCustomers = useSelector((state) => state.currentCustomers);
  const [roomNo, setRoomNo] = useState();
  const [formData, setFormData] = useState({
    name: "",
    members: 0,
    roomNo: 0,
    idNo: "",
    bill: 0,
  });

  const submitForm = (e) => {

    e.preventDefault();
    if (!(roomNo in occupiedRooms)) { // if room is already vacant or not present in rooms then alert the message 
      alert("Room not available or is Vacant");
      return;
    }
    const newCurrentCustomers = currentCustomers.filter((obj) => {
      return obj.roomNo !== roomNo;
    }); // filter the current customer list and remove the current customer
    dispatch(setCurrentCustomers(newCurrentCustomers));
    const newOccupiedRooms = { ...occupiedRooms };
    delete newOccupiedRooms[roomNo]; // delete the room from the occupied rooms list
    dispatch(setOccupiedRooms(newOccupiedRooms)); //updating occupied rooms list
    setForms({ entry: false, checkout: false }); // minimize the form 
    axios.post("http://localhost:4000/data-submit", formData, { //adding the entry to the backend
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const handleChange = (e) => {
    setRoomNo(e.target.value);
  };

  useEffect(() => { //checking if the room is occupied
    if (roomNo in occupiedRooms) {
      currentCustomers.map((customer)=>{
        if(customer.roomNo===roomNo){
            setFormData((prev) => { //setting the formData to  the data of customer staying in that room
                return { ...prev, ...customer };
            });
        }
      })     
    } else {
      setFormData({ name: "", members: 0, roomNo: 0, idNo: "", bill: 0 }); //else remove the details
    }
  }, [roomNo]);

  return (
    <motion.form
      onSubmit={submitForm}
      initial={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
      animate={{ height: "auto", paddingTop: 20, paddingBottom: 20 }}
      exit={{ height: 0, paddingTop: 0, paddingBottom: 0 }}
      className="w-[300px] flex flex-col gap-1 bg-blue-50 shadow-slate-600 shadow-md p-5 rounded-lg overflow-hidden"
    >
      <div className="flex flex-col flex-1">
        <label for="RoomNo"> Room-No:</label>
        <input
          required
          value={roomNo}
          name="roomNo"
          onChange={handleChange}
          className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
          id="RoomNo"
          type="number"
        />
      </div>
      <div className="flex flex-col">
        <label for="fullName"> Full Name:</label>
        <input
          required
          disabled
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
            disabled
            value={formData.members}
            name="members"
            className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1 "
            id="Members"
            type="number"
            defaultValue={1}
          />
        </div>
      </div>
      <div className="flex gap-2 flex-shrink">
        <div className="flex flex-col flex-3">
          <label for="IdNo"> Id-No:</label>
          <input
            required
            disabled
            name="idNo"
            value={formData.idNo}
            className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
            id="RoomNo"
            type="text"
          />
        </div>
        <div className="flex flex-col flex-2">
          <label for="Bill">Bill:</label>
          <input
            required
            value={formData.bill}
            name="bill"
            className="border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1"
            id="Bill"
            type="number"
          />
        </div>
      </div>

      <button
        className="bg-blue-500 text-white p-2  rounded-[400px] active:bg-blue-600"
        type="submit"
      >
        Checkout
      </button>
    </motion.form>
  );
}

export default CheckoutForm;
