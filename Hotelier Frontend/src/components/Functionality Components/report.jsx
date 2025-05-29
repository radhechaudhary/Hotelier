import React, { useState } from 'react'
import {motion} from 'framer-motion'
import ReportGraph from './reportGraph'
import { useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function Report() {
    const [page, setPage]=useState('week')
    const weekData=useSelector(state=>state.weekData)
    const monthData=useSelector(state=>state.monthData)
    const yearData=useSelector(state=>state.yearData)
    
  return (
     <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:'easeIn'}} id="customers" className=" bg-[url('/asfalt-dark.png')] flex-1 md:rounded-tl-2xl  bg-blue-50 shadow-black shadow-md text-slate-700  ml-[0.5px] h-[calc(100vh-60px)] px-5 py-5 md:px-10 md:py-10 flex flex-col gap-10 items-center  overflow-hidden ">
        <Tooltip title="Here You Can watch the weekly, monthly or yearly stats of your entries in an interactive way. Just Toggle buttton." placement='left-start'>
            <div  className='absolute top-[65px] right-[10px] w-5 h-5 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer'><QuestionMarkIcon sx={{width:'20px',height:'20px', color:'white'}}/></div>
        </Tooltip>
        <h1 className='text-center text-2xl font-bold'>Your Report Card<div className='w-full h-1 bg-red-400 rounded-full'/></h1>
        <div className='flex w-full flex-col gap-10 justify-center'>
            <div className='w-full flex justify-center gap-1'>
                <div onClick={()=>{setPage('week')}} className={`flex relative justify-center items-center cursor-pointer font-medium bg-gray-200 border-[1px] p-1 border-blue-400 w-[80px] rounded-md ${page==='week'?"text-white":"text-slate-900"}`}>
                    {page==='week'?<motion.div layoutId='blue' className='absolute rounded-md w-full h-full bg-blue-500'/>:null}
                    <p className='z-10'>Week</p></div>
                <div onClick={()=>{setPage('month')}} className={`flex relative justify-center items-center cursor-pointer font-medium bg-gray-200 border-[1px] p-1 border-blue-400 w-[80px] rounded-md ${page==='month'?"text-white":"text-slate-900"}`}>
                    {page==='month'?<motion.div layoutId='blue' className='absolute rounded-md w-full h-full bg-blue-500'/>:null}
                    <p className='z-10'>Month</p></div>
                <div onClick={()=>{setPage('year')}} className={`flex relative justify-center items-center cursor-pointer font-medium bg-gray-200 border-[1px] p-1 border-blue-400 w-[80px] rounded-md ${page==='year'?"text-white":"text-slate-900"}`}>
                    {page==='year'?<motion.div layoutId='blue' className='absolute rounded-md w-full h-full bg-blue-500'/>:null}
                    <p className='z-10'>Year</p></div>
            </div>
            {page==='week'?<ReportGraph keyName={"Day"} Data={weekData} />:null}
            {page==='month'?<ReportGraph keyName={"Month"} Data={monthData}/>:null}
            {page==='year'?<ReportGraph keyName={"Year"} Data={yearData}/>:null}
        </div>       
    </motion.div>
  )
}

export default Report