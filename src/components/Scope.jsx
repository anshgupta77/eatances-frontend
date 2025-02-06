
import favorite from "./../assets/icon-favorite.svg"
import download from "./../assets/icon-download_for_offline.svg";
import dining from "./../assets/icon_dining.svg";
import event from "./../assets/icon-event-attendees.svg";

const Scope = () => {
    return (
      <div className="w-[87vw] mx-auto flex justify-between items-center h-[50vh]">
        <div className="flex flex-col justify-center text-left space-y-4 w-[50%]">
          <div className="text-blue-950">
            <div className="text-5xl font-bold text-[#0a830a]">
              Elevating Your Dining
            </div>
            <div className="text-5xl font-bold text-blue-950">
              <span className="text-[#0a830a]">Experience</span> & Enriching <br />
              Your Culinary Journey
            </div>
          </div>
          <div className="text-lg text-gray-600">
            Whether you are a food enthusiast exploring new flavors or a casual <br />
            diner seeking convenience, Eatance is here to enhance your <br />
            culinary adventures.
          </div>
        </div>
  
        <div className="grid grid-cols-2 w-[50%]">
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[95%] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={favorite} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">3.5 Million+</div>
                <div>Diners Love Our Products Globally</div>
            </div>
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[95%] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={download} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">25,000+</div>
                <div>Restaurants Using Globally</div>
            </div>
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[95%] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={event} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">8,00,000+</div>
                <div>Onboarded Event Attendees</div>
            </div>
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[95%] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={dining} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">4.7 Million</div>
                <div>App Impressions</div>
            </div>
        </div>

      </div>
    );
  }
  
  export default Scope;


// import React from "react";
// import favorite from "../assets/favorite.png"; // Ensure you have this image imported correctly
// import download from "../assets/download.png"; // Ensure you have this image imported correctly

// const Scope = () => {
//   return (
//     <div className="w-[95vw] mx-auto flex flex-col md:flex-row justify-between items-center h-auto md:h-[50vh] space-y-6 md:space-y-0">
//       <div className="flex flex-col justify-center text-left space-y-4 w-full md:w-[50%]">
//         <div className="text-blue-950">
//           <div className="text-3xl md:text-5xl font-bold text-[#0a830a]">
//             Elevating Your Dining
//           </div>
//           <div className="text-3xl md:text-5xl font-bold text-blue-950">
//             <span className="text-[#0a830a]">Experience</span> & Enriching <br />
//             Your Culinary Journey
//           </div>
//         </div>
//         <div className="text-sm md:text-lg text-gray-600">
//           Whether you are a food enthusiast exploring new flavors or a casual <br className="hidden md:block" />
//           diner seeking convenience, Eatance is here to enhance your culinary adventures.
//         </div>
//       </div>

//       {/* Cards Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[50%] gap-4">
//         <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-full md:w-[95%] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
//           <img src={favorite} alt="favorite" className="h-5 w-5" />
//           <div className="text-xl md:text-2xl font-bold">3.5 Million+</div>
//           <div>Diners Love Our Products Globally</div>
//         </div>
//         <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-full md:w-[95%] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
//           <img src={download} alt="download" className="h-5 w-5" />
//           <div className="text-xl md:text-2xl font-bold">5M+ Downloads</div>
//           <div>Across All Platforms</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scope;

  