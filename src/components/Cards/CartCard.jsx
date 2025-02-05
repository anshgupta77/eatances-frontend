import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ValidationOfCart, setCart, totalPrice } from "../../Slices/CartSlice";
// import { setLoading, removeLoading } from "../../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import deleteImage from "../../assets/delete.png";
import { FiTrash } from "react-icons/fi";
import { useRequestCall } from "../../hook";
import { notifySuccess } from "../../App";

const CartCard = ({ cartItems }) => {
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [patchLoading, setPatchLoading] = useState(false)
  const loading = deleteLoading || patchLoading // Get loading state from Redux
  const subTotal = useSelector(totalPrice);
  const isCartValid = useSelector(ValidationOfCart);


  const [makeDeleteRequest] = useRequestCall("delete");
  const [makePatchRequest] = useRequestCall("patch");
  console.log(loading);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(cartItems[0].quantity);
  const removeFromCart = (dish) => {
    setDeleteLoading(true);
    makeDeleteRequest(`${VITE_BACKEND_URL}/cart/${dish._id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setCart(response.data.cart));
        notifySuccess("Item Removed Successfully");
      }).catch((error) => {
        console.error("Error removing item from cart:", error);
      }).finally(() => {
        setDeleteLoading(false);
      });
    };


    function handleClearCart(){
      makeDeleteRequest(`${VITE_BACKEND_URL}/cart`)
      .then((response) => {
        console.log(response.data);
        dispatch(setCart(response.data.cart));
        notifySuccess("Cart Cleared Successfully");
      })
    }



  function handleQuantity(dish, increment) {
    setPatchLoading(true);
    makePatchRequest(`${VITE_BACKEND_URL}/cart/${dish._id}`, { changeQuantity :increment })
        .then((response) => {
          console.log(response.data);
          dispatch(setCart(response.data.cart));
        }).catch((error) => {
          console.error("Error updating quantity:", error);
        }).finally(() => {
          setPatchLoading(false);
        })
  }
  
  return (
    <div className="relative p-3">
      
      {/* CircularProgress Overlay */}
      {loading ? (
        <> 
          {console.log("loading" , loading)}
          <div className="absolute inset-0 flex justify-center align-center bg-transparent opacity-50 z-50">
            <CircularProgress />
          </div>
        </>
      ):(
      <div className="flex gap-4">
            <div className="flex-1 bg-gray-100 border-r-1 pr-2 min-h-[80vh]">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-10">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your cart is empty!
                  </h2>
                  <p className="text-gray-600 text-center max-w-md">
                    Looks like you haven't added anything to your cart yet. Start exploring and add your favorite items to the cart!
                  </p>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
                    onClick={() => window.location.href = "/products"} // Redirect to products page
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                !isCartValid ? 
                (
                      <div className="flex flex-col items-center justify-center gap-4 py-10 ">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Your cart is invalid! Clear your cart.
                        </h2>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold " onClick={handleClearCart}>
                            Clear Cart
                          </button>
                      </div>
                    ):(
                    cartItems.map((item) => {
                      return (
                      <div key={item.dish._id} className="flex border-2 border-gray-200 bg-white p-4 items-center my-3">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="h-24 w-24 object-cover rounded"
                        />
                        <div className="flex-grow px-4 text-left">
                          <h2 className="text-lg font-semibold">{item.dish.name}</h2>
                          <p className="text-sm text-gray-600">{item.dish.description}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-green-500 text-sm font-bold">
                              {item.dish.category}
                            </span>
                          </div>
                          <div className="mt-2 text-left">
                            <span className="text-xl font-bold text-gray-800">
                              ₹{item.dish.price}
                            </span>
                            {!item.dish.inStock && (
                              <span className="text-sm text-red-500 ml-2">
                                Out of Stock
                              </span>
                            )}
                          </div>
                       
                            <div className="flex items-center gap-2 mt-4">
                              {item.quantity === 1 ? (
                                <button
                                  onClick={() => removeFromCart(item.dish)}
                                  className="px-2 py-1 bg-gray-300 rounded"
                                >
                                  <FiTrash />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleQuantity(item.dish, -1)}
                                  className="px-2 bg-gray-300 rounded"
                                >
                                  -
                                </button>
                              )}
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => handleQuantity(item.dish, +1)}
                                className="px-2 bg-gray-300 rounded"
                              >
                                +
                              </button>
                            </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.dish)}
                          className="ml-4 flex  text-red-500 hover:underline"
                        >
                       <img src={deleteImage} alt="" className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  // }
                }))
              )}
            </div>  



          <div className="p-4 border rounded shadow-md bg-white h-[40vh]">
              {/* Free Delivery Info */}
              <div className="flex items-center bg-green-50 p-3 rounded mb-4">
                <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center text-white mr-2">
                  ✓
                </div>
                <div>
                  <h2 className="text-green-700 font-semibold text-sm">
                    Your order is eligible for FREE Delivery.
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Choose <strong>FREE Delivery</strong> option at checkout.
                  </p>
                </div>
              </div>

              {/* Subtotal Section */}
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""}): </strong>
                  <span className="font-semibold">₹{subTotal.toFixed(2)}</span>
                </p>
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="giftOption" className="mr-2" />
                  <label htmlFor="giftOption" className="text-sm text-gray-600">
                    This order contains a gift
                  </label>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded mb-4">
                Proceed to Buy
              </button>

              {/* EMI Section */}
              <div className="text-sm text-gray-600 border-t pt-2">
                <button className="flex items-center justify-between w-full text-gray-700">
                  <span>EMI Available</span>
                  <span className="text-lg font-semibold">⌄</span>
                </button>
              </div>
            </div>
      </div>
      )}

     
    </div>
  );
};

export default CartCard;
