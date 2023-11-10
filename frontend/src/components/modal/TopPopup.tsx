import React from "react";
import { useAppSelector } from "../../app/hooks";
import { GiCrossMark } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";

const TopPopup: React.FC = () => {
  const message = useAppSelector((state) => state.popup.message);
  const status = useAppSelector((state) => state.popup.status);
  const isVisible = useAppSelector((state) => state.popup.isVisbile);

  const initialState = {
    y: -20,
    opacity: 0,
  };
  const animateState = {
    y: 0,
    opacity: 1,
  };
  const exitState = {
    y: -20,
    opacity: 0,
  };
  // const transition = { delay: 0.2 };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="topPopUp"
          initial={initialState}
          animate={animateState}
          exit={exitState}
          // transition={transition}
          className={`z-10 absolute top-0 w-auto h-auto bg-cs-white/20 dark:bg-cs-black/20 text-cs-white mt-5 2k:mt-10 4k:mt-14 flex items-center justify-center gap-2 2k:gap-4 px-4 2k:px-7 py-2 2k:py-4 rounded-full input-login-text-res border-2 ${
            status >= 200 && status < 300 ? "border-green" : "border-red"
          }`}
        >
          {status >= 400 && <GiCrossMark className=" text-red" />}
          {status >= 200 && status < 300 && (
            <TiTick className=" text-green scale-150" />
          )}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopPopup;
