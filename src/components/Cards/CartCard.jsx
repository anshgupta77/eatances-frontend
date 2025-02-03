import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../Slices/CartSlice";
import { setLoading, removeLoading } from "../../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import deleteImage from "../../assets/delete.png";
import { FiTrash } from "react-icons/fi";
import { useRequestCall } from "../../hook";

const CartCard = ({ cartItems }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading); // Get loading state from Redux


  const [makeDeleteRequest] = useRequestCall("delete");
  const [makePatchRequest] = useRequestCall("patch");
  console.log(loading);

  // console.log(cartItems[0].quantity);
  const removeFromCart = (dish) => {
   
    makeDeleteRequest(`http://localhost:3000/cart/${dish._id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setCart(response.data.cart));
      })
    };





  function handleQuantity(dish, increment) {
    makePatchRequest(`http://localhost:3000/cart/${dish._id}`, { changeQuantity :increment })
        .then((response) => {
          console.log(response.data);
          dispatch(setCart(response.data.cart));
        })

  }
  
  return (
    <div className="relative">
      
      {/* CircularProgress Overlay */}
      {loading ? (
        <> 
          {console.log("loading" , loading)}
          <div className="absolute inset-0 flex justify-center align-center bg-transparent opacity-50 z-50">
            <CircularProgress />
          </div>
        </>
      ):(
        <>
           <div className={`transition-opacity duration-300 bg-gray-100`}>
           <h1 className="text-3xl font-bold text-gray-800  mb-8 text-center">
          Carts Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {cartItems.map((item) =>{ 
              if(!item.dish){
                return (
                  <div className="">
                    <h1 className="text-2xl font-bold text-gray-800">Your cart is invalid !</h1>
                  </div>
                )
              }else return (
             <div
              key={item.dish._id}
              className={`bg-white rounded-2xl shadow-lg border-1 border-gray-600 hover:shadow-lg overflow-hidden transition transform hover:shadow-2xl ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
            >
              <img
                src={item.dish.image}
                alt={item.dish.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.dish.name}
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
                <div className="flex justify-between mt-6 ">
                
                    <button
                      onClick={() => removeFromCart(item.dish)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Remove
                    </button>
                  <div className="flex items-center gap-1.5">
                  {/* <button
                    onClick={() => handleQuantity(item.dish, -1)}
                    className="bg-gray-200 px-2 py-1 rounded-l-lg text-gray-800 hover:bg-gray-300"
                    >
                    {item.quantity === 1 ? "remove": "-"}
                  </button> */}

                  {item.quantity === 1 ? (
                    <button
                    onClick={() => removeFromCart(item.dish)}
                    className="bg-gray-200 px-2 py-1 rounded-l-lg text-gray-800 hover:bg-gray-300"
                    >
                    <img src={deleteImage} alt="" className="w-5 h-5"/>
                  </button>
                  ):(
                    <button
                    onClick={() => handleQuantity(item.dish, -1)}
                    className="bg-gray-200 px-2 py-1 rounded-l-lg text-gray-800 hover:bg-gray-300"
                    >
                    -
                  </button>
                  )
                  }
                  <span className="px-4 py-1 bg-gray-100 text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity(item.dish, +1)}
                    className="bg-gray-200 px-2 py-1 rounded-r-lg text-gray-800 hover:bg-gray-300"
                    >
                    +
                  </button>
                </div>

              </div>

                </div>
                </div>
                )
      })}
        </div>
      </div>
        </>

      )}

      {/* Main Content */}
     
    </div>
  );
};

export default CartCard;
