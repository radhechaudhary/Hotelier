import { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StaffTable from './staffTable';
import AddStaffForm from './addStaffForm';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function Staff() {
    const [adding, setAdding]=useState();
    const [attendance, setAttendance]=useState(false)
  return (
    <motion.div
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        transition={{ease:'easeIn'}} 
        id="customers" 
        className=" bg-[url('/asfalt-dark.png')] flex-1 md:rounded-tl-2xl  bg-blue-50 shadow-black shadow-md text-slate-700  ml-[0.5px] h-[calc(100vh-60px)] px-2 py-5 md:px-10 md:py-10 flex flex-col gap-10 items-center overflow-hidden">
            <Tooltip title="This page is to maintain youur staff...You can add, remove staff and also edit their details " placement='left-start'>
                <div  className='absolute top-[65px] right-[10px] w-5 h-5 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer'><QuestionMarkIcon sx={{width:'20px',height:'20px', color:'white'}}/></div>
            </Tooltip>
            <h1 className='text-center text-2xl font-bold'>Staff Management<div className='w-full h-1 bg-rose-500 rounded-full'/></h1>
            <div className="flex flex-col gap-7 flex-grow h-full w-full">
                <div className='flex w-full flex-col gap-10 justify-between'>
                    <div className='flex-col flex gap-2 w-fit'>
                        <div onClick={()=>{setAdding(!adding)}} className='items-center gap-2 flex-0 flex text-left font-bold text-[18px] cursor-pointer bg-green-600 text-white px-2 py-1 active:scale-90 rounded-lg w-36'><AddCircleIcon/>Add Staff</div>
                        <input placeholder='search' className='border  border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' />
                    </div>
                </div>
                <StaffTable/>
                <AnimatePresence>
                    {adding?<AddStaffForm setAdding={setAdding}/>:null}
                </AnimatePresence>
                
            </div>
            
    </motion.div>
  )
}

export default Staff