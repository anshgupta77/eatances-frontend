
import favorite from "./../assets/icon-favorite.svg"
import download from "./../assets/icon-download_for_offline.svg";
import dining from "./../assets/icon_dining.svg";
import event from "./../assets/icon-event-attendees.svg";

const Scope = () => {
    return (
      <div className="w-[87vw] mx-auto flex justify-between items-center h-[50vh]">
        <div className="flex flex-col justify-center text-left space-y-4 w-[50%]">
          <div className="text-blue-950">
            <div className="text-5xl font-bold text-green-600">
              Elevating Your Dining
            </div>
            <div className="text-5xl font-bold text-blue-950">
              <span className="text-green-600">Experience</span> & Enriching <br />
              Your Culinary Journey
            </div>
          </div>
          <div className="text-lg text-gray-600">
            Whether you are a food enthusiast exploring new flavors or a casual <br />
            diner seeking convenience, Eatance is here to enhance your <br />
            culinary adventures.
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-0 w-[50%]">
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[330px] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={favorite} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">3.5 Million+</div>
                <div>Diners Love Our Products Globally</div>
            </div>
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[300px] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={download} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">25,000+</div>
                <div>Restaurants Using Globally</div>
            </div>
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[330px] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={event} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">8,00,000+</div>
                <div>Onboarded Event Attendees</div>
            </div>
            <div className="flex flex-col items-start text-blue-950 space-y-2 p-4 rounded-lg shadow-md w-[300px] h-[200px] justify-center hover:shadow-lg transition-shadow duration-300">
                <img src={dining} alt="" className="h-5 w-5" />
                <div className="text-2xl font-bold">4.7 Million</div>
                <div>App Impressions</div>
            </div>
        </div>

      </div>
    );
  }
  
  export default Scope;
  