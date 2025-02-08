// import React, { useState } from "react";
// import { Link } from "react-router-dom";


// const MerchantCounterCard = ({ counterData }) => {
//     console.log(counterData);
//     return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {counterData.map((counter) => (
//         <Link to={`/dish/counter/${counter._id}`} 
//           key={counter._id}
//           className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col gap-4 hover:cursor-pointer"
//         >
//           {/* Top section with title and actions */}
//           <div className="flex justify-between items-center">
//             {/* Counter Name */}
//               <h2 className="text-xl font-bold text-gray-800 hover:underline">
//                 {counter.name}
//               </h2>
//               <img src={counter.image} alt="" />
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default MerchantCounterCard;




import React from "react";
import { Link } from "react-router-dom";

const MerchantCounterCard = ({ counterData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-8">
      {counterData.map((counter) => (
        <Link
          to={`/dish/counter/${counter._id}`}
          key={counter._id}
          className="group relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Counter Image Section */}
          <div className="h-32 bg-[#228B22]/10 relative overflow-hidden">
            {counter.image ? (
              <img
                src={counter.image}
                alt={counter.name}
                className=" object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-[#228B22]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            )}
            {/* Overlay with status indicator */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#228B22]/10 text-[#228B22] backdrop-blur-sm">
                Active
              </span>
            </div>
          </div>

          {/* Counter Details Section */}
          <div className="p-6">
            <div className="flex flex-col space-y-4">
              {/* Counter Name */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Counter Name</p>
                <h2 className="text-xl font-semibold text-blue-950 group-hover:text-[#228B22] transition-colors duration-300">
                  {counter.name}
                </h2>
              </div>

              {/* Quick Stats */}

              {/* View Details Button */}
              <div className="pt-2">
                <div className="flex items-center justify-center p-2 bg-[#228B22]/10 rounded-xl text-[#228B22] group-hover:bg-[#228B22] group-hover:text-white transition-all duration-300">
                  <span className="font-medium">View Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MerchantCounterCard;