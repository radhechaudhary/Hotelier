import React from 'react'
import {motion} from 'framer-motion'

function RoomCell(prop) {
  return (
    <div className="z-100 absolute  left-1/2 -translate-x-1/2 origin-center  bg-white rounded-b-lg text-slate-950 p-10">
        <h1 className='text-xl text-center font-bold'>{prop.roomNo}</h1>
        <div>
            <p className="text-lg font-semibold">Costumer Name: {prop.customer.customerName}</p>
            <p className="text-lg font-semibold">Occupied From: {prop.customer.entryDate}</p>
        </div>
    </div>
  )
}

export default RoomCell