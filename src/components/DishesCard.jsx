import React from "react";

const DishCard = ({ dishes }) => {
  return (
    <>
    <h1 className="text-2xl font-bold mb-6">Dishes Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish) => (
        //   <DishCard key={dish._id} dish={dish} />
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold text-gray-800">{dish.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
      <p className="text-sm font-semibold text-green-600 mb-2">
        Category: {dish.category}
      </p>
      <p className="text-lg font-semibold text-gray-800">₹{dish.price}</p>
      {dish.inStock ? (
        <p className="text-sm text-green-500 font-medium">In Stock</p>
      ) : (
        <p className="text-sm text-red-500 font-medium">Out of Stock</p>
      )}
    </div>
        ))}
      </div>
    </>
  );
};

export default DishCard;
