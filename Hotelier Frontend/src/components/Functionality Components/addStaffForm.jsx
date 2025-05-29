import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { setStaff } from '../../features/data.Slice';

function AddStaffForm(prop) {
    const dispatch=useDispatch();
    const  staff= useSelector(state=>state.staff);
    const [formData, setFormData]=useState({name:"", role:"", dept:"", address:"", reportingTime:''})

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault();
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        dispatch(setStaff([...staff, {...formData, joiningDate:  formattedDate, id:staff.length} ]))
        prop.setAdding(false)
    }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ease:'easeIn'}} className='z-[1000] top-0 left-0 absolute w-screen h-screen bg-black/70 backdrop-blur-sm flex justify-center items-center'>
        <motion.div initial={{scale:0}} animate={{scale:1}} className='card flex flex-col gap-2 absolute w-[350px] bg-slate-200 rounded-3xl px-4 py-6 shadow-md shadow-black'>
            <div onClick={()=>{prop.setAdding(false)}} className='absolute top-3 right-3 w-5 h-5 flex justify-center items-center rounded-full bg-rose-500 text-white p-0 active:bg-rose-700 active:scale-95 cursor-pointer'>x</div>
            <form onSubmit={submitForm} className='flex flex-col gap-2 mt-4'>
                <div className='flex flex-col flex-1'>
                    <label for="name"> Name:</label>
                    <input required  name='name' value={formData.name} onChange={handleChange} className='border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' id='name' type='text' />
                </div>
                <div className='w-full flex gap-2 flex-grow'>
                    <div className='flex flex-col flex-1'>
                        <label for="role">Role:</label>
                        <input required value={formData.role} onChange={handleChange}  name='role' className='border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' id='role' type='text' />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <label for="time"> ReportingTime:</label>
                        <input required value={formData.reportingTime} onChange={handleChange}  name='reportingTime' className='border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' type='time' id='time' />
                    </div>
                </div>
                
                <div className='flex flex-col flex-1'>
                    <label for="dept"> Department:</label>
                    <input required value={formData.dept} onChange={handleChange}  name='dept' className='border w-[100%] border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' id='dept' type='text' />
                </div>
                <div className='flex flex-col'>
                    <label for="address"> Address:</label>
                    <textarea required value={formData.address} onChange={handleChange}  name='address' className='border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' id='address' />
                </div>
                
                <button className='bg-blue-500 text-white p-2  rounded-[400px] active:bg-blue-600' type='submit'>Add</button>
            </form>
            
        </motion.div>
    </motion.div>
  )
}

export default AddStaffForm