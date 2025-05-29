import Card from "./card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import BarGraph from "./barGraph";

function DashBoard() {

  //getting all the states used in this page
  const weekData = useSelector((state) => state.weekData);
  const totalRooms = useSelector((state) => state.rooms).length;
  const occupied = useSelector((state) => state.occupiedRooms);
  const totalOccupied = Object.keys(occupied).length;  // finding the  length of occupied Rooms Obj 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="dashboard"
      className="bg-[url('/asfalt-dark.png')] md:rounded-tl-2xl flex-grow bg-blue-50 shadow-black shadow-md text-slate-700  ml-[0.5px] h-[calc(100vh-60px)] p-10 overflow-y-scroll flex flex-col gap-7 items-center custom-scrollbar"
    >
      <h1 className="text-center text-2xl font-bold">
        Your Professional DashBaord
        <div className="w-full h-1 bg-red-400 rounded-full" />
      </h1>
      <div
        id="cards"
        className="w-[100%] flex-grow flex-shrink flex flex-wrap justify-around gap-[10px]"
      >
        <Link to="/rooms">
          <Card
            heading={"Rooms"}
            data={[
              { name: "occupied", value: totalOccupied },
              { name: "vacant", value: totalRooms - totalOccupied },
            ]}
            total={totalRooms}
          />
        </Link>
        <Link to="/staff">
          <Card
            heading={"Staff"}
            data={[
              { name: "Present", value: 20 },
              { name: "Leave", value: 5 },
              { name: "Absent", value: 2 },
            ]}
            total={27}
          />
        </Link>
        <Link to="/report">
          <BarGraph heading={"Week Report"} data={weekData} total={150} />
        </Link>
      </div>
    </motion.div>
  );
}

export default DashBoard;
