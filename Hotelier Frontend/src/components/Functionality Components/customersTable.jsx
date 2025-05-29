import React from 'react'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';


function CustomerTable() {
    const data= useSelector(state=>state.currentCustomers);
    
  return (
  <motion.div initial={{ opacity:0}} animate={{ opacity:1}} transition={{ease:'easeIn'}} layout className=" flex flex-col overflow-y-scroll pb-10 custom-scrollbar">
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Sr No</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Room No</th>
            <th className="p-2 border">Members</th>
            <th className="p-2 border">Entry Date</th>
            <th className="p-2 border">Entry Time</th>
          </tr>
        </thead>
        <tbody >
          {data.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{entry.name}</td>
              <td className="p-2 border">{entry.roomNo}</td>
              <td className="p-2 border">{entry.members}</td>
              <td className="p-2 border">{entry.entryDate}</td>
              <td className="p-2 border">{entry.entryTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default CustomerTable