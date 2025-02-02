import React, { useState } from "react";
import { Link } from "react-router-dom";


const MerchantCounterCard = ({ counterData }) => {
    console.log(counterData);
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {counterData.map((counter) => (
        <Link to={`/dish/counter/${counter._id}`} 
          key={counter._id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col gap-4 hover:cursor-pointer"
        >
          {/* Top section with title and actions */}
          <div className="flex justify-between items-center">
            {/* Counter Name */}
              <h2 className="text-xl font-bold text-gray-800 hover:underline">
                {counter.name}
              </h2>
              <img src={counter.image} alt="" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MerchantCounterCard;
