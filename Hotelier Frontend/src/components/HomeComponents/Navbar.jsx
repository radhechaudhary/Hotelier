import logo from '../../assets/react.svg'

function Navbar() {
  return (
    <div className='z-20 w-full top-0 right-[50%] translate-x-[50%] rounded-b-lg font-semibold text-[16px] text-gray-800 px-2 sm:px-4 h-[60px]  fixed flex items-center justify-start'>
        <img src={logo}/>
    </div>
  )
} 

export default Navbar