import React from "react";
import { Link } from "react-router-dom";

const CounterCard = ({ counterData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 h-[70vh]">
      {/* Since counterData is a single object, you don't need to map */}

      {counterData.map((counter) => (
      <Link to={`/dish/counter/${counter._id}`}>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{counter.name}</h2>
        </div>
      </Link>
       ))}
    </div>
  );
};

export default CounterCard;
