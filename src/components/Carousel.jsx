
import React from "react";
import { motion } from "framer-motion";
import bannerPic from "./../assets/food-ordering-banner-pic.webp";

const Carousel = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-[80vh] px-4 lg:px-6 my-2 justify-between mx-auto w-[95%] lg:w-[90vw]">
      {/* Content Section */}
      <div className="flex flex-col justify-center text-left space-y-4 w-full lg:w-[50%] mt-8 lg:mt-0">
        <div className="text-blue-950">
          <div className="text-2xl lg:text-3xl font-bold">
            <span className="text-[#0a830a]">No Markup </span> Food Ordering
          </div>  
          <div className="text-4xl lg:text-6xl font-bold text-[#0a830a]">
            <span>Your Passport to <br /></span>
            <span>the</span> <span className="text-blue-950">Future of Dining</span>
          </div>
        </div>
        <div className="text-base lg:text-lg text-gray-600">
          Welcome to Eatance, the revolutionary Food-Tech that is transforming your dining experience. Happy You, Happy Restaurants
        </div>
        <div>
          <button className="px-8 lg:px-12 py-3 lg:py-4 bg-[#228B22] text-white text-lg lg:text-xl rounded-md hover:bg-[#228B22]">
            Contact us
          </button>
        </div>
      </div>

      {/* Image Section */}
      <motion.div
        className="w-full lg:w-[40%] h-[50vh] lg:h-[80vh] flex flex-col justify-center mt-8 lg:mt-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src={bannerPic} alt="Food Banner" className="object-cover w-full h-[40vh] lg:h-[70vh] rounded-lg" />
      </motion.div>
    </div>
  );
};

export default Carousel;
