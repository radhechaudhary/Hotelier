import Landing from './HomeComponents/Landing'
import { motion } from 'framer-motion'
import About from './HomeComponents/about'
import CreatedBy from './HomeComponents/createdBy'


function Home() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='bg-blue-100 font-poppins'>
        <Landing/>
        <About/>
        <CreatedBy/>
    </motion.div>
  )
}

export default Home