import { useState } from "react";
import EntryForm from "./entryForm";
import CustomerTable from "./customersTable";
import { AnimatePresence } from "framer-motion";
import CheckoutForm from "./checkoutForm";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Tooltip from "@mui/material/Tooltip";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function Customers() {
  const [forms, setForms] = useState({ entry: false, checkout: false });
  const currentCustomers = useSelector((state) => state.currentCustomers);

  const openForm = (type) => {
    if (type === "entry") {
      setForms({ entry: !forms.entry, checkout: false });
    }
    if (type === "checkout") {
      setForms({ entry: false, checkout: !forms.checkout });
    }
  };
  const parentVariants = {
    hover: {},
  };
  const childVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 180 },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn" }}
      id="customers"
      className=" bg-[url('/asfalt-dark.png')] flex-1 md:rounded-tl-2xl  bg-blue-50 shadow-black shadow-md text-slate-700  ml-[0.5px] h-[calc(100vh-60px)] px-5 py-5 md:px-10 md:py-10 flex flex-col gap-7 items-center  overflow-hidden "
    >
      <Tooltip
        title="This is the main section. Where you create an entry for new ustomers using the entry form and also get info of currently staying customers in table below. Curstomer is also checked Out from here jus enter the room no all details will appear."
        placement="left-start"
      >
        <div className="absolute top-[65px] right-[10px] w-5 h-5 rounded-full flex justify-center items-center bg-orange-500 cursor-pointer">
          <QuestionMarkIcon
            sx={{ width: "20px", height: "20px", color: "white" }}
          />
        </div>
      </Tooltip>
      <h1 className="text-center text-2xl font-bold">
        Customers
        <div className="w-full h-1 bg-red-400 rounded-full" />
      </h1>
      <div className="flex w-full flex-col gap-10 h-full">
        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-2 w-full items-center ">
            <div className="flex gap-20 justify-center">
              <motion.div
                variants={parentVariants}
                initial="initial"
                whileHover="hover"
                onClick={() => openForm("entry")}
                className="items-center gap-2 flex text-left font-bold text-[18px] cursor-pointer bg-green-600 text-white px-2 py-1 active:scale-90 rounded-lg"
              >
                <motion.div
                  variants={childVariants}
                  transition={{ duration: 0.5 }}
                >
                  <AddCircleIcon />
                </motion.div>
                New Entry
              </motion.div>
              {currentCustomers.length > 0 ? (
                <motion.div
                  variants={parentVariants}
                  initial="initial"
                  whileHover="hover"
                  onClick={() => openForm("checkout")}
                  className="items-center gap-2 flex text-left font-bold text-[18px] cursor-pointer bg-rose-500 text-white px-2 py-1 active:scale-90 rounded-lg"
                >
                  <motion.div
                    variants={childVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <RemoveCircleIcon />
                  </motion.div>{" "}
                  Checkout
                </motion.div>
              ) : null}
            </div>
            <AnimatePresence>
              {forms.entry ? (
                <div>
                  <EntryForm setForms={setForms} />
                </div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {forms.checkout ? (
                <div>
                  <CheckoutForm setForms={setForms} />
                </div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        {currentCustomers.length > 0 ? (
          <CustomerTable />
        ) : (
          <p className="text-slate-600 text-center">No Customer Yet</p>
        )}
      </div>
    </motion.div>
  );
}

export default Customers;
