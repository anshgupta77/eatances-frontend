import React from "react";
import { Link } from "react-router-dom";

const CounterCard = ({ counterData }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="my-[2%] flex flex-col text-center space-y-2">
        <div className="text-center text-5xl font-bold text-blue-950">
          Your <span className="text-green-500">Favourite Brands</span>, All in One Place
        </div>
        <div className="text-center text-lg text-gray-600">
          Eatance partners with the best restaurants and event organizers to bring you an unmatched selection of coupons and deals.
        </div>
      </div>

      <div className="p-4 flex flex-wrap justify-center gap-4">
        {counterData.map((counter, index) => (
          <Link key={counter._id} to={`/dish/counter/${counter._id}`} className="basis-1/5 sm:basis-1/4 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
            <div className="bg-white w-[240px] h-[120px] rounded-full overflow-hidden shadow-sm">
              <img src={counter.image} alt={`brand-${index}`} className="w-full h-full object-cover rounded-lg" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CounterCard;
