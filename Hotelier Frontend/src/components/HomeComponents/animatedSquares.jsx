import React from 'react'
import {motion} from 'framer-motion'

function AnimatedSquares() {
  return (
    <div className='w-full flex-1 relative flex justify-center items-center'>
        <motion.div animate={{rotate:360}} transition={{repeat:Infinity, duration:10, ease:"linear"}} className='flex flex-col justify-around w-[200px] md:h-full h-[400px] '>
            <motion.svg animate={{rotate:360, x: [30, 0, -30, 0, 30], scale:[1,1.2,1]}} transition={{repeat:Infinity, duration:5, ease:"linear"}} className='z-0' width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <g fill="rgb(59, 130, 246)">
                    <circle cx="30" cy="10" r="4" />
                    <circle cx="50" cy="10" r="4" />
                    <circle cx="70" cy="10" r="4" />
                    <circle cx="10" cy="10" r="4" />
                    
                    <circle cx="10" cy="30" r="4" />
                    <circle cx="30" cy="30" r="4" />
                    <circle cx="50" cy="30" r="4" />
                    <circle cx="70" cy="30" r="4" />
                    
                    <circle cx="10" cy="50" r="4" />
                    <circle cx="30" cy="50" r="4" />
                    <circle cx="50" cy="50" r="4" />
                    <circle cx="70" cy="50" r="4" />
                    
                    <circle cx="10" cy="70" r="4" />
                    <circle cx="30" cy="70" r="4" />
                    <circle cx="50" cy="70" r="4" />
                    <circle cx="70" cy="70" r="4" />
                </g>
            </motion.svg>
            <motion.svg animate={{rotate:360,x: [-30, 0, 30, 0, -30], scale:[1,1.2,1]}} transition={{repeat:Infinity, duration:5, ease:"linear"}} className='z-0 ' width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <g fill="rgb(59, 130, 246)">
                    <circle cx="30" cy="10" r="4" />
                    <circle cx="50" cy="10" r="4" />
                    <circle cx="70" cy="10" r="4" />
                    <circle cx="10" cy="10" r="4" />
                    
                    <circle cx="10" cy="30" r="4" />
                    <circle cx="30" cy="30" r="4" />
                    <circle cx="50" cy="30" r="4" />
                    <circle cx="70" cy="30" r="4" />
                    
                    <circle cx="10" cy="50" r="4" />
                    <circle cx="30" cy="50" r="4" />
                    <circle cx="50" cy="50" r="4" />
                    <circle cx="70" cy="50" r="4" />
                    
                    <circle cx="10" cy="70" r="4" />
                    <circle cx="30" cy="70" r="4" />
                    <circle cx="50" cy="70" r="4" />
                    <circle cx="70" cy="70" r="4" />
                </g>
            </motion.svg>
        </motion.div>
    </div>
  )
}

export default AnimatedSquares