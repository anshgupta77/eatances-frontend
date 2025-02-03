import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart, totalPrice } from "../../Slices/CartSlice";
import { setLoading, removeLoading } from "../../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import deleteImage from "../../assets/delete.png";
import { FiTrash } from "react-icons/fi";
import { useRequestCall } from "../../hook";

const CartCard = ({ cartItems }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading); // Get loading state from Redux
  const subTotal = useSelector(totalPrice);


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


    function handleClearCart(){
      makeDeleteRequest(`http://localhost:3000/cart`)
      .then((response) => {
        console.log(response.data);
        dispatch(setCart(response.data.cart));
      })
    }



  function handleQuantity(dish, increment) {
    makePatchRequest(`http://localhost:3000/cart/${dish._id}`, { changeQuantity :increment })
        .then((response) => {
          console.log(response.data);
          dispatch(setCart(response.data.cart));
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
      //   <>
      //      <div className={`transition-opacity duration-300 bg-gray-100`}>
      //      <h1 className="text-3xl font-bold text-gray-800  mb-8 text-center">
      //     Carts Menu
      //   </h1>
      //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      //     {cartItems.map((item) =>{ 
      //         if(!item.dish){
      //           return (
      //             <div className="">
      //               <h1 className="text-2xl font-bold text-gray-800">Your cart is invalid !</h1>
      //             </div>
      //           )
      //         }else return (
      //        <div
      //         key={item.dish._id}
      //         className={`bg-white rounded-2xl shadow-lg border-1 border-gray-600 hover:shadow-lg overflow-hidden transition transform hover:shadow-2xl ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
      //       >
      //         <img
      //           src={item.dish.image}
      //           alt={item.dish.name}
      //           className="w-full h-52 object-cover"
      //         />
      //         <div className="p-6">
      //           <h2 className="text-xl font-semibold text-gray-800 mb-2">
      //             {item.dish.name}
      //           </h2>
      //           <p className="text-sm text-gray-600 mb-4">{item.dish.description}</p>
      //           <p className="text-sm font-semibold text-green-600">
      //             Category: {item.dish.category}
      //           </p>
      //           <p className="text-lg font-bold text-gray-900 mt-2">
      //             ₹{item.dish.price}
      //           </p>
      //           {item.dish.inStock ? (
      //             <p className="text-sm text-green-500 font-medium mt-2">
      //               In Stock
      //             </p>
      //           ) : (
      //             <p className="text-sm text-red-500 font-medium mt-2">
      //               Out of Stock
      //             </p>
      //           )}
      //           <div className="flex justify-between mt-6 ">
                
      //               <button
      //                 onClick={() => removeFromCart(item.dish)}
      //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      //               >
      //                 Remove
      //               </button>
      //             <div className="flex items-center gap-1.5">
      //             {/* <button
      //               onClick={() => handleQuantity(item.dish, -1)}
      //               className="bg-gray-200 px-2 py-1 rounded-l-lg text-gray-800 hover:bg-gray-300"
      //               >
      //               {item.quantity === 1 ? "remove": "-"}
      //             </button> */}

      //             {item.quantity === 1 ? (
      //               <button
      //               onClick={() => removeFromCart(item.dish)}
      //               className="bg-gray-200 px-2 py-1 rounded-l-lg text-gray-800 hover:bg-gray-300"
      //               >
      //               <img src={deleteImage} alt="" className="w-5 h-5"/>
      //             </button>
      //             ):(
      //               <button
      //               onClick={() => handleQuantity(item.dish, -1)}
      //               className="bg-gray-200 px-2 py-1 rounded-l-lg text-gray-800 hover:bg-gray-300"
      //               >
      //               -
      //             </button>
      //             )
      //             }
      //             <span className="px-4 py-1 bg-gray-100 text-gray-800">
      //               {item.quantity}
      //             </span>
      //             <button
      //               onClick={() => handleQuantity(item.dish, +1)}
      //               className="bg-gray-200 px-2 py-1 rounded-r-lg text-gray-800 hover:bg-gray-300"
      //               >
      //               +
      //             </button>
      //           </div>

      //         </div>

      //           </div>
      //           </div>
      //           )
      //         })}
      //   </div>
      // </div>
      //   </> 
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
                cartItems.map((item) => {
                  if (!item.dish) {
                    return (
                      <div key={item.id} className="flex flex-col items-center justify-center gap-4 py-10 ">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Your cart is invalid! Clear your cart.
                        </h2>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold " onClick={handleClearCart}>
                            Clear Cart
                          </button>
                      </div>
                    )
                  } else {
                    return (
                      <div key={item.dish._id} className="flex border-b border-gray-200 bg-white p-4 items-center">
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
                                  className="px-2 py-1 bg-gray-300 rounded"
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
                  }
                })
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

      {/* Main Content */}
     
    </div>
  );
};

export default CartCard;
