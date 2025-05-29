import monuments from '../../assets/monuments.jpg'
import Login from './Login';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='relative h-screen  text-gray-600 flex flex-col md:flex-row md:justify-around justify-center md:gap-10  gap-20 px-5 lg:px-32 lg:gap-28  items-center'>
        <img className='opacity-[0.08] absolute z-0 bottom-0 left-0 w-screen min-h-[300px]' src={monuments}/>
        <svg className='absolute z-0 top-[300px] md:left-[100px] left-[0px] ' width="100" height="100" xmlns="http://www.w3.org/2000/svg">
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
        </svg>
        <svg className='absolute z-0 top-[500px] md:right-[400px] right-[0px]' width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <g fill="rgb(59, 130, 246)">
                <circle cx="10" cy="10" r="4" />
                <circle cx="30" cy="10" r="4" />
                <circle cx="50" cy="10" r="4" />
                <circle cx="70" cy="10" r="4" />
                
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
        </svg>
        <div className='z-10 flex flex-col md:w-auto w-[85%] gap-4'>
            <p className='text-blue-500 text-xl font-bold'>Hotelier- Your digital register</p>
            <h1 className='font-bold z-10 md:text-6xl sm:text-4xl text-4xl '>A Leading Hotel Management System</h1>
            <p className='text-lg'>One Solution to replace all your registers</p>
        </div>
        <Login/>
        <Link to='/signup' className='px-4 py-1 cursor-pointer bg-rose-500 active:bg-rose-600 active:scale-[0.95] text-white fixed bottom-5 right-5 rounded-xl'>Register</Link>
    </div>
  )
}

export default Landing