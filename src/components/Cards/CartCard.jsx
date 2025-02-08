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
import { Loader2 } from "lucide-react";
import LoadingOverlay from "../LoadingOverlay";

const CartCard = ({ cartItems }) => {
  // ... keeping all the existing state and functions ...
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
    <div className="relative p-2 lg:p-3">
      {loading ? (
        <LoadingOverlay />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items Section */}
          <div className="flex-1 bg-gray-100 min-h-[50vh] lg:min-h-[80vh]">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-6 lg:py-10 px-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 text-center">
                  Your cart is empty!
                </h2>
                <p className="text-gray-600 text-center text-sm lg:text-base max-w-md">
                  Looks like you haven't added anything to your cart yet. Start exploring and add your favorite items to the cart!
                </p>
                <button
                  className="bg-[#228B22] hover:text-[#0a830a] text-white px-4 lg:px-6 py-2 rounded-md font-semibold text-sm lg:text-base"
                  onClick={() => window.location.href = "/dish"}
                >
                  Shop Now
                </button>
              </div>
            ) : !isCartValid ? (
              <div className="flex flex-col items-center justify-center gap-4 py-6 lg:py-10">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 text-center px-4">
                  Your cart is invalid! Clear your cart.
                </h2>
                <button className="bg-[#228B22] hover:text-[#0a830a] text-white px-4 lg:px-6 py-2 rounded-md font-semibold text-sm lg:text-base" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.dish._id} className="flex flex-col lg:flex-row border-2 border-gray-200 bg-white p-3 lg:p-4 items-start lg:items-center my-3 rounded-lg mx-auto w-[95%] lg:w-[90%]">
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="h-32 w-full lg:h-24 lg:w-24 object-cover rounded mb-3 lg:mb-0"
                  />
                  <div className="flex-grow px-0 lg:px-4 text-left w-full">
                    <div className="flex justify-between items-start">
                      <h2 className="text-base lg:text-lg font-semibold">{item.dish.name}</h2>
                      <button
                        onClick={() => removeFromCart(item.dish)}
                        className="text-red-500 hover:underline"
                      >
                        <img src={deleteImage} alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
                      </button>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">{item.dish.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-[#228B22] text-xs lg:text-sm font-bold">
                        {item.dish.category}
                      </span>
                    </div>
                    <div className="mt-2 text-left">
                      <span className="text-lg lg:text-xl font-bold text-gray-800">
                        ₹{item.dish.price}
                      </span>
                      {!item.dish.inStock && (
                        <span className="text-xs lg:text-sm text-red-500 ml-2">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {item.quantity === 1 ? (
                        <button
                          onClick={() => removeFromCart(item.dish)}
                          className="px-2 py-1 bg-gray-300 rounded"
                        >
                          <FiTrash className="text-sm lg:text-base" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuantity(item.dish, -1)}
                          className="px-2 py-1 bg-gray-300 rounded text-sm lg:text-base"
                        >
                          -
                        </button>
                      )}
                      <span className="text-sm lg:text-base">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item.dish, +1)}
                        className="px-2 py-1 bg-gray-300 rounded text-sm lg:text-base"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <div className="w-[80vw] lg:w-auto lg:min-w-[300px] p-4 border rounded shadow-md bg-white h-[260px] lg:max-h-260px mx-auto ">
            <div className="flex items-center bg-green-50 p-3 rounded mb-4">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-700 rounded-full flex items-center justify-center text-white mr-2 text-xs lg:text-sm">
                ✓
              </div>
              <div>
                <h2 className="text-green-700 font-semibold text-xs lg:text-sm">
                  Your order is eligible for FREE Delivery.
                </h2>
                <p className="text-gray-600 text-xs">
                  Choose <strong>FREE Delivery</strong> option at checkout.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 text-sm lg:text-base">
                <strong>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""}): </strong>
                <span className="font-semibold">₹{subTotal.toFixed(2)}</span>
              </p>
              <div className="flex items-center mt-2">
                <input type="checkbox" id="giftOption" className="mr-2" />
                <label htmlFor="giftOption" className="text-xs lg:text-sm text-gray-600">
                  This order contains a gift
                </label>
              </div>
            </div>

            <button className="w-full bg-[#228B22] hover:text-[#0a830a] text-white font-semibold py-2 rounded mb-4 text-sm lg:text-base">
              Proceed to Buy
            </button>

            <div className="text-xs lg:text-sm text-gray-600 border-t pt-2">
              <button className="flex items-center justify-between w-full text-gray-700">
                <span>EMI Available</span>
                <span className="text-base lg:text-lg font-semibold">⌄</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCard;