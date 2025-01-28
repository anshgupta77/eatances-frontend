import React from "react";
import axios from "axios";
import { useDispatch , useSelector} from "react-redux";
import { setDish } from "../Slices/DishSlice";
import { setCart } from "../Slices/CartSlice";
import { useState } from "react";
import EditDish from "./EditDish";
import { Link } from "react-router-dom";
const DishCard = ({ dishes }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);
  const items = useSelector(state => state.cart.items);
  

  function isInCart(dish){
    return items.some(item => item.dish._id === dish._id);
  }
  const openEditModal = (dish) => {
    setCurrentDish(dish);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setCurrentDish(null);
    setIsEditing(false);
  };


  function addItemToCart(dish){
    axios.post("http://localhost:3000/cart", {dish: dish._id})
    .then(response =>{
        console.log(response);
        dispatch(setCart(response?.data?.cart || []));
    })
  }

  // function editDish(dish){
  //   axios.post("http://localhost:3000/dish", {dish: dish._id})
  //   .then(response =>{
  //       console.log(response);
  //       dispatch(setCart(response.data.cart));
  //   })
  // }


  function deleteDish(id){
    axios.delete(`http://localhost:3000/dish/${id}`)
    .then(response =>{
        console.log(response.data);
        dispatch(setDish(response.data.counterDish));
    })
  }



  console.log("Dishes in the dishCard",dishes);
  return (
    <>
      {isEditing && (
        <EditDish dish={currentDish} onClose={closeEditModal}  />
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="bg-white rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {dish.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{dish.description}</p>
              <p className="text-sm font-semibold text-green-600">
                Category: {dish.category}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                ₹{dish.price}
              </p>
              {dish.inStock ? (
                <p className="text-sm text-green-500 font-medium mt-2">
                  In Stock
                </p>
              ) : (
                <p className="text-sm text-red-500 font-medium mt-2">
                  Out of Stock
                </p>
              )}
              <div className="flex justify-between mt-6">

                {isInCart(dish) ? (
                  <Link to="/cart"><button
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">  <span className="text-sm text-black">Go to Cart</span></button></Link>
                ):(
                  <button
                  onClick={()=>addItemToCart(dish)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => openEditModal(dish)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteDish(dish._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DishCard;

