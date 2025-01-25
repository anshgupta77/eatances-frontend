import bannerPic from "./../assets/food-ordering-banner-pic.webp";

const Carousel = () => {
  return (
    <div className="flex h-[100vh] px-6 my-2 justify-between mx-auto w-[90vw]">
      {/* Content Section */}
        <div className="flex flex-col justify-center text-left space-y-4 w-[50%] ">
        <div className="text-blue-950">
            <div className="text-3xl font-bold">
                <span className="text-green-600">No Markup </span> Food Ordering
            </div>
        <div className="text-6xl font-bold text-green-600">
            <span>Your Passport to <br /></span>
            <span>the</span> <span className=" text-blue-950">Future of Dining</span>
        </div>
        </div>
        <div className="text-lg text-gray-600">
          Welcome to Eatance, the revolutionary Food-Tech that is transforming your dining experience. Happy You, Happy Restaurants
        </div>
        <div>
          <button className="px-12 py-4 bg-green-500 text-white text-xl rounded-md hover:bg-green-600">
            Contact us
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-[40%] h-[100vh] flex flex-col justify-center ">
        <img src={bannerPic} alt="Food Banner" className="object-cover w-full h-[70vh] rounded-lg" />
      </div>
    </div>
  );
};

export default Carousel;
