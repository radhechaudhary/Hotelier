import Landing from './HomeComponents/Landing'
import { motion } from 'framer-motion'


function Home() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='bg-blue-100 font-poppins'>
        <Landing/>
    </motion.div>
  )
}

export default Home