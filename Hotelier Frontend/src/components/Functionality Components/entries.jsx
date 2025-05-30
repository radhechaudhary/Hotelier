import React, { useState, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function Entries() {
    const [data, setData]=useState([])
    const [filteredData, setFilteredData]=useState([]);
    const [inputValue, setInputvalue]=useState("");
    const [inputType, setInputType]=useState('text');
    const [searchFor, setSearchFor]=useState('name');
    const [currentEntry, setCurrentEntry]=useState({});
    const [openedCard, setOpenedCard]=useState(false);

    useEffect(()=>{  // fetch data when page loads
      axios.post('http://localhost:4000/get-data',{},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
          setData(res.data.entries);
          setFilteredData(res.data.entries);
        })
        .catch((err)=>{
          console.log(err.message)
        })
    },[])

    const handleChange=(e)=>{
        setInputvalue(e.target.value)
        if(e.target.value===""){
          setFilteredData(data)
          return;
        }

        setFilteredData(()=>{
          return data.filter((entry)=>{
            console.log(entry[searchFor], " ", e.target.value)
            return entry[searchFor].toString().toUpperCase().includes(e.target.value.toString().toUpperCase())
          })
        })
    }
    const types={"name":'text', "room_no":'text', "entry_date":'date'}
    const TypeChange=(e)=>{
        setInputType(types[e.target.value])
        setSearchFor(e.target.value)
    }

    const handleClick=(index)=>{
      setCurrentEntry(filteredData[index]);
      setOpenedCard(true);
    }
    const headers=['Sr No', 'Name', 'Mobile', 'Room No', 'Members', 'Id no', 'Entry Date', 'EntryTime', 'OutDate', 'Out Time', ]

  return (
   <motion.div initial={{opacity:0}} animate={{opacity:1}} id="enteries" className="flex-1 bg-[url('/asfalt-dark.png')] md:rounded-tl-2xl flex-grow bg-blue-50 shadow-black shadow-md text-slate-700  ml-[0.5px] h-[calc(100vh-60px)] p-5 md:p-10 flex flex-col gap-7 items-center overflow-hidden">
        <Tooltip title="Here you get all the previously stayed customers and their details. click on a row to expand and print details." placement='left-start'>
            <div  className='absolute top-[65px] right-[10px] w-5 h-5 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer'><QuestionMarkIcon sx={{width:'20px',height:'20px', color:'white'}}/></div>
        </Tooltip>
        <h1 className='text-center text-2xl font-bold'>Entries<div className='w-full h-1 bg-red-400 rounded-full'/></h1>
        <div className="flex flex-col gap-1 flex-grow h-full w-full">
            <div className='flex'>
                 <select onChange={TypeChange} className='border border-slate-950 w-[70px] rounded-xl rounded-r-none active:outline-none active:border-collapse px-1 py-1 text-[14px]'>
                    <option  value='name'>Name</option>
                    <option  value='room_no'>Room No</option>
                    <option  value='entry_date'>entryDate</option>
                </select>
                <input onChange={handleChange} value={inputValue} className='border border-slate-950 w-[200px] rounded-xl rounded-l-none active:outline-none active:border-collapse px-2 py-1' placeholder='search' type={inputType} />
            </div>
            <AnimatePresence>
            <div className='overflow-y-scroll pb-10 overflow-x-auto custom-scrollbar'>
            <motion.table initial={{ opacity:0}} animate={{ opacity:1}} transition={{ease:'easeIn', delay:0.1}}  className=" flex-1 w-full border border-gray-300 text-left ">
                <thead className="bg-gray-100">
                  <tr>
                      <th className="p-2 border">Sr No</th>
                      <th className="p-2 border">Entry Date</th>
                      <th className="p-2 border">Entry Time</th>
                      <th className="p-2 border">Room No</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Members</th>
                  </tr>
                </thead>
                <tbody>
                {filteredData.map((entry, index) => (
                    <tr key={index} onClick={()=>handleClick(index)} className="hover:bg-gray-50">
                      <td className="p-2 border">{entry.sr_no}</td>
                      <td className="p-2 border">{entry.entry_date}</td>
                      <td className="p-2 border">{entry.entry_time}</td>
                      <td className="p-2 border">{entry.room_no}</td>
                      <td className="p-2 border">{entry.name}</td>
                      <td className="p-2 border">{entry.members}</td>
                    </tr>
                ))}
                </tbody>
            </motion.table>
            </div>
            </AnimatePresence>
        </div>
        <AnimatePresence>
        {openedCard?<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ease:'easeIn'}} className='z-[1000] top-0 left-0 absolute w-screen h-screen bg-black/70 backdrop-blur-sm flex justify-center items-center'>
          <motion.div initial={{scale:0}} animate={{scale:1}} className='card flex flex-col gap-2 absolute w-[350px] bg-slate-200 rounded-3xl px-4 py-6 shadow-md shadow-black'>
            {Object.keys(currentEntry).map((key, index)=>{
              return <p className='font-medium text-slate-700' key={index}><span className=' font-bold'>{headers[index]}</span>: {currentEntry[key]}</p>
            })}
            <div className='buttons flex w-full gap-[20px] flex-grow'>
              <button onClick={()=>setOpenedCard(false)} className='bg-blue-500 text-white p-2 flex-1 rounded-[400px] active:bg-blue-600'>Ok</button>
              <button className='bg-green-500 text-white p-2 flex-1 rounded-[400px] active:bg-green-600'>Print</button>
            </div>
          </motion.div>
        </motion.div>:<></>}
        </AnimatePresence>
   </motion.div>

  )
}

export default Entries