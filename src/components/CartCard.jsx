import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "../Slices/CartSlice";
const CartCard = ({ cartItems }) => {
  const dispatch = useDispatch();
  console.log("Dishes in the dishCard",cartItems);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Dishes Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cartItems.map((item) => (
          <div
            key={item.dish._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={item.dish.image}
              alt={item.dish.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{item.dish.description}</p>
              <p className="text-sm font-semibold text-green-600">
                Category: {item.dish.category}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                ₹{item.dish.price}
              </p>
              {item.dish.inStock ? (
                <p className="text-sm text-green-500 font-medium mt-2">
                  In Stock
                </p>
              ) : (
                <p className="text-sm text-red-500 font-medium mt-2">
                  Out of Stock
                </p>
              )}
              <div className="flex justify-center mt-6">
                <button
                  onClick={()=>addItemToCart(item.dish)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartCard;

