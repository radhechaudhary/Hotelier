import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setSidebar } from "../../features/data.Slice";

function Sidebar() {
  
  const dispatch = useDispatch();
  const location = useLocation();
  const sideBar = useSelector((state) => state.sideBar); //state for visibility of sideBar on smaller screens
  const links = [
    "dashboard",
    "customers",
    "rooms",
    "staff",
    "entries",
    "report",
  ];

  const close = () => { // function to close sideBar after a delay 
    setTimeout(() => {
      dispatch(setSidebar(false));
    }, 300);
  };

  return (
    <div
      className={`lg:w-[300px] md:w-[250px] w-[200px] h-screen md:h-auto absolute md:relative ${
        !sideBar ? "top-0 -left-80 md:left-0" : "top-0 z-[2] left-0"
      } transition-all flex text-slate-800 bg-blue-200 flex-col justify-center items-center `}
      id="sideBar"
    >
      <ul className="flex flex-col gap-8 list-disc">
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className="relative p-1 hover:text-slate-600 flex items-center gap-3"
            >
              {location.pathname === `/${link}` ? (
                <motion.div
                  layoutId="underline"
                  transition={{ ease: "easeInOut" }}
                  className=" w-3 h-3 rounded-full bg-rose-500"
                />
              ) : null}
              <Link
                to={`/${link}`}
                onClick={close}
                className="text-base font-semibold md:text-lg lg:text-xl from-neutral-600 active:scale-95 capitalize flex flex-col items-center"
              >
                {link}
                <motion.div
                  className={` ${
                    location.pathname === `/${link}` ? "w-full" : "w-0"
                  } transition-all  bg-rose-500 h-[4px] rounded-full`}
                ></motion.div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
