import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import entries from '../../assets/entries.png'
import report from '../../assets/report.png'
import rooms from '../../assets/rooms.png'
import dashboard from '../../assets/dashboard.png'
import customers from '../../assets/customers.png'
import staff from '../../assets/staff.png'
import entries2 from '../../assets/entries2.png'
import report2 from '../../assets/report2.png'
import rooms2 from '../../assets/rooms2.png'
import dashboard2 from '../../assets/dashboard2.png'
import customers2 from '../../assets/customers2.png'
import staff2 from '../../assets/staff2.png'

function About() {
  const aboutRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 3], ['0%', '-200%']);

  return (
    <div
      ref={aboutRef}
      id="About"
      className="bg-blue-100 relative h-[300vh] w-full"
    >
      {/* Sticky wrapper div */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-[300vw]"
        >
          <div className="w-screen h-screen relative">
            <div className='w-[52vw] absolute top-10 left-10 rounded-xl overflow-hidden'>
                <img className='hidden md:block' src={dashboard}/>
                <img className=' md:hidden' src={dashboard2}/>
                <div className='w-full h-full absolute bg-black/70 flex justify-center items-center top-0 left-0'>
                <motion.h1 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{delay:0.5, ease:'easeIn'}} className='text-center text-2xl font-bold text-slate-100'>Get Your own professional dashbaord</motion.h1>
                </div>
            </div>
            <div className='w-[52vw] absolute bottom-10 right-10 rounded-xl overflow-hidden'>
                <img className='hidden md:block' src={rooms}/>
                <img className=' md:hidden' src={rooms2}/>
                <div className='w-full h-full absolute bg-black/70 flex justify-center items-center top-0 left-0'>
                
                <motion.h1 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{delay:0.5, ease:'easeIn'}} className='w-8/12 text-center text-2xl font-bold text-slate-100'>Manage your rooms in a professional and interactive Way</motion.h1>
                </div>
            </div>
          </div>
          <div className=" w-screen h-screen relative">
            <div className='w-[52vw] absolute top-10 left-10 rounded-xl overflow-hidden'>
                <img className='hidden md:block' src={customers}/>
                <img className=' md:hidden' src={customers2}/>
                <div className='w-full h-full absolute bg-black/70 flex justify-center items-center top-0 left-0'>
                <motion.h1 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{delay:0.5, ease:'easeIn'}} className='text-center text-2xl font-bold text-slate-100'>
                    Get a register for customer details!! All Automated just need to enter details
                </motion.h1>
                </div>
            </div>
            <div className='w-[52vw] absolute bottom-10 right-10 rounded-xl overflow-hidden'>
                <img className='hidden md:block' src={entries}/>
                <img className=' md:hidden' src={entries2}/>
                <div className='w-full h-full absolute bg-black/70 flex justify-center items-center top-0 left-0'>
                
                <motion.h1 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{delay:0.5, ease:'easeIn'}} className='w-8/12 text-center text-2xl font-bold text-slate-100'>
                    A page where you get the details of all previously stayed customers and print them!!
                </motion.h1>
                </div>
            </div>
          </div>
          <div className="w-screen h-screen relative">
            <div className='w-[52vw] absolute top-10 left-10 rounded-xl overflow-hidden'>
                <img className='hidden md:block' src={staff}/>
                <img className=' md:hidden' src={staff2}/>
                <div className='w-full h-full absolute bg-black/70 flex justify-center items-center top-0 left-0'>
                <motion.h1 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{delay:0.5, ease:'easeIn'}} className='text-center text-2xl font-bold text-slate-100'>
                    Manage your staff Professionally, mark Attendance do whatever is necessary!!
                </motion.h1>
                </div>
            </div>
            <div className='w-[52vw] absolute bottom-10 right-10 rounded-xl overflow-hidden'>
                <img className='hidden md:block' src={report}/>
                <img className=' md:hidden' src={report2}/>
                <div className='w-full h-full absolute bg-black/70 flex justify-center items-center top-0 left-0'>
                
                <motion.h1 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{delay:0.5, ease:'easeIn'}} className='w-8/12 text-center text-2xl font-bold text-slate-100'>
                Manage your rooms in a professional and interactive Way
                </motion.h1>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
