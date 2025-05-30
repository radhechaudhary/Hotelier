import React from 'react'
import img from '../../assets/my-image.png'

function CreatedBy() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <img className='w-[400px] h-[400px] mb-5' src={img}/>
        <h1 className='text-center font-bold text-3xl'>Mohit Chaudhary</h1>
        <h2 className='text-center font-semibold text-xl'>A B.Sc Graduate</h2>
    </div>
  )
}

export default CreatedBy