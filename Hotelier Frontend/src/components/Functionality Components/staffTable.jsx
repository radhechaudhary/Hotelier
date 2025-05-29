import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { setStaff } from '../../features/data.Slice';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';

function StaffTable() {
    const dispatch=useDispatch();
    const data=useSelector(state=>state.staff)
    const [filteredData, setFilteredData] = useState([])
    const [removing, setRemoving]=useState(false);
    const [current, setCurrent]=useState(null)
    
    useEffect(()=>{
      setFilteredData(data)
    },[data])

    const remove=()=>{
      const staff= [...data];
      const updatedStaff=staff.filter((employee)=>{
        return employee.id!== current;
      })
      dispatch(setStaff(updatedStaff))
      axios.post('http://localhost:4000/change-staff', {staff:updatedStaff}, 
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
      setRemoving(false)
    }

  return (
   <div className=' overflow-y-scroll pb-10 overflow-x-auto custom-scrollbar'>
               <motion.table initial={{ opacity:0}} animate={{ opacity:1}} transition={{ease:'easeIn', delay:0.1}}  className=" flex-1 w-full border border-gray-300 text-left ">
                   <thead className="bg-gray-100">
                     <tr>
                         <th className="p-2 border">Id</th>
                         <th className="p-2 border">Name</th>
                         <th className="p-2 border">Role</th>
                         <th className="p-2 border">Department</th>
                         <th className='p-2 border'>Utility</th>
                     </tr>
                   </thead>
                   <tbody>
                   {filteredData.map((employee, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-2 border">{employee.id}</td>
                          <td className="p-2 border">{employee.name}</td>
                          <td className="p-2 border">{employee.role}</td>
                          <td className="p-2 border">{employee.dept}</td>
                          <td className='p-2 border flex gap-2'>
                            <button onClick={()=>{setRemoving(true); setCurrent(employee.id)}} className='bg-rose-500 text-white font-medium rounded-lg p-1 active:scale-95 active:bg-rose-700 w-20'>Remove</button>
                            <button className='bg-green-500 text-white font-medium rounded-lg p-1 active:scale-95 active:bg-green-700 w-20'>Edit</button>
                          </td>
                        </tr>
                    ))}
                   </tbody>
               </motion.table>
                {removing?<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ease:'easeIn'}} className='z-[1000] top-0 left-0 absolute w-screen h-screen bg-black/70 backdrop-blur-sm flex justify-center items-center'>
                    <motion.div initial={{scale:0}} animate={{scale:1}} className='flex flex-col gap-5 justify-center items-center absolute w-[350px] bg-slate-200 rounded-3xl px-4 py-6 shadow-md shadow-black'>
                      <ErrorIcon/>
                      <p className='text-slate-700 font-medium'>Are you Sure You want to remove this employee ??</p>
                      <div className='flex w-full justify-center gap-2'>
                        <button onClick={remove} className='w-20 bg-rose-500 text-white rounded-full p-1 active:bg-rose-700 active:scale-95'>Remove</button>
                        <button onClick={()=>setRemoving(false)} className='w-20 bg-slate-500 text-white rounded-full p-1 active:bg-slate-700 active:scale-95'>Cancel</button>
                      </div>
                    </motion.div>
                </motion.div>:null}
               </div>
  )
}

export default StaffTable