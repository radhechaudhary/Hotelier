import React, {useState, useEffect} from 'react'
import RoomCell from './roomCell';
import {isNumericalString, motion} from 'framer-motion'
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function Rooms() {
    const [roomOpened, setRoomOpened]= useState(false);
    const [filteredRooms, setFilteredRooms]= useState([]);
    const [inputValue, setInputvalue]= useState("");
    const rooms=useSelector(state=>state.rooms);
    const totalRooms=rooms.length;
    const occupied=useSelector(state=>state.occupiedRooms);
    const vacant=totalRooms-Object.keys(occupied).length;

    const openRoom=(roomNo)=>{
        if(roomNo in occupied){
            alert(`Ocuupied By ${occupied[roomNo].customerName} since ${occupied[roomNo].entryDate}`)
        }
        else{
            alert('room vacant')
        }
    }
    useEffect(()=>{
        setFilteredRooms(rooms);
    },[rooms])

    const handleChange=(e)=>{
        if(!isNumericalString(e.target.value) && e.target.value!=="") return;
        setInputvalue(e.target.value)
        setFilteredRooms(rooms.filter((room)=>{
            return room.toString().includes(e.target.value);
        }))
    }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} id='rooms' className="bg-[url('/asfalt-dark.png')] flex-1 md:rounded-tl-2xl flex-grow bg-blue-50 shadow-black shadow-md text-slate-700  ml-[0.5px] h-[calc(100vh-60px)] p-5 md:p-10  flex flex-col gap-7 items-center overflow-hidden ">
        <Tooltip title="Here You Can see the information of the rooms the ones marked with red are occupied and green are vacant. Click on red rooms to see who's staying." placement='left-start'>
                    <div  className='absolute top-[65px] right-[10px] w-5 h-5 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer'><QuestionMarkIcon sx={{width:'20px',height:'20px', color:'white'}}/></div>
                </Tooltip>
       <h1 className='text-center text-2xl font-bold'>Rooms<div className='w-full h-1 bg-red-400 rounded-full'/></h1>
        <div>
            <input value={inputValue} onChange={handleChange} className='border border-slate-950 rounded-xl active:outline-none active:border-collapse px-2 py-1' placeholder='search' type='text' />
            
        </div>
        <div className=' flex flex-col gap-1 w-full h-full '>
            <div className='flex justify-between items-end w-full'>
                <div>
                    <p>Total:{totalRooms}</p>
                    <p>Occupied:{Object.keys(occupied).length}</p>
                    <p>vacant:{vacant}</p>
                </div>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-1'><div className="bg-green-500 rounded-[500px] w-3 h-3"></div> <p>vacant</p></div>
                    <div className='flex items-center gap-1'><div className="bg-red-600 rounded-[500px] w-3 h-3"></div> <p>Occupied</p></div>
                </div>
            </div>
            <div className="flex flex-col w-full h-full pb-44">
                <div id='roomsData' className="flex flex-wrap gap-[2px] justify-left overflow-y-scroll overflow-x-auto custom-scrollbar">
                    {filteredRooms.map((roomNo, index)=>{
                        return (<motion.div key={index} initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2, duration:0.5}} onClick={()=>openRoom(roomNo)} className={` ${!(roomNo in occupied)?"bg-green-500":"bg-red-600"} border-[2px] w-20 cursor-pointer border-black text-white flex items-center justify-center`}>{roomNo}</motion.div>)
                    })}
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Rooms