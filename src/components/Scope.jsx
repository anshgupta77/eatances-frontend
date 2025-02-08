
import favorite from "./../assets/icon-favorite.svg"
import download from "./../assets/icon-download_for_offline.svg";
import dining from "./../assets/icon_dining.svg";
import event from "./../assets/icon-event-attendees.svg";

const Scope = () => {
  return (
    <div className="w-[95%] lg:w-[87vw] mx-auto flex flex-col lg:flex-row justify-between items-center min-h-[50vh] py-8 lg:py-0 gap-8 lg:gap-0">
      {/* Text Section */}
      <div className="flex flex-col justify-center text-left space-y-4 w-full lg:w-[50%]">
        <div className="text-blue-950">
          <div className="text-3xl lg:text-5xl font-bold text-[#0a830a]">
            Elevating Your Dining
          </div>
          <div className="text-3xl lg:text-5xl font-bold text-blue-950">
            <span className="text-[#0a830a]">Experience</span> & Enriching{" "}
            <br className="hidden lg:block" />
            Your Culinary Journey
          </div>
        </div>
        <div className="text-base lg:text-lg text-gray-600">
          Whether you are a food enthusiast exploring new flavors or a casual{" "}
          <br className="hidden lg:block" />
          diner seeking convenience, Eatance is here to enhance your{" "}
          <br className="hidden lg:block" />
          culinary adventures.
        </div>
      </div>

      {/* Cards Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:w-[50%] gap-4">
        <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-full lg:w-[95%] h-[180px] lg:h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
          <img src={favorite} alt="" className="h-5 w-5" />
          <div className="text-xl lg:text-2xl font-bold">3.5 Million+</div>
          <div className="text-sm lg:text-base">Diners Love Our Products Globally</div>
        </div>
        <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-full lg:w-[95%] h-[180px] lg:h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
          <img src={download} alt="" className="h-5 w-5" />
          <div className="text-xl lg:text-2xl font-bold">25,000+</div>
          <div className="text-sm lg:text-base">Restaurants Using Globally</div>
        </div>
        <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-full lg:w-[95%] h-[180px] lg:h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
          <img src={event} alt="" className="h-5 w-5" />
          <div className="text-xl lg:text-2xl font-bold">8,00,000+</div>
          <div className="text-sm lg:text-base">Onboarded Event Attendees</div>
        </div>
        <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-full lg:w-[95%] h-[180px] lg:h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
          <img src={dining} alt="" className="h-5 w-5" />
          <div className="text-xl lg:text-2xl font-bold">4.7 Million</div>
          <div className="text-sm lg:text-base">App Impressions</div>
        </div>
      </div>
    </div>
  );
}
  
  export default Scope;

