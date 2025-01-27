// import React from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCart , setLoading, removeLoading} from './../Slices/CartSlice';
// import { CircularProgress } from "@mui/material";
// const CartCard = ({ cartItems }) => {
//   const dispatch = useDispatch();
//   console.log("Dishes in the dishCard",cartItems);
//   function removeFromCart(dish){
//     dispatch(setLoading());
//     axios.delete(`http://localhost:3000/cart/${dish._id}`)
//     .then(response =>{
//         console.log(response.data);
//         dispatch(setCart(response.data.cart));
//     }).catch(error =>{
//       console.log(error);
//     }).finally(()=>{
//       dispatch(removeLoading());
//     })
//   }
//   return (
//     <>

//       <CircularProgress />
//       <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//         Dishes Menu
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {cartItems.map((item) => (
//           <div
//             key={item.dish._id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
//           >
//             <img
//               src={item.dish.image}
//               alt={item.dish.name}
//               className="w-full h-52 object-cover"
//             />
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {item.name}
//               </h2>
//               <p className="text-sm text-gray-600 mb-4">{item.dish.description}</p>
//               <p className="text-sm font-semibold text-green-600">
//                 Category: {item.dish.category}
//               </p>
//               <p className="text-lg font-bold text-gray-900 mt-2">
//                 ₹{item.dish.price}
//               </p>
//               {item.dish.inStock ? (
//                 <p className="text-sm text-green-500 font-medium mt-2">
//                   In Stock
//                 </p>
//               ) : (
//                 <p className="text-sm text-red-500 font-medium mt-2">
//                   Out of Stock
//                 </p>
//               )}
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={()=>removeFromCart(item.dish)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default CartCard;



import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setLoading, removeLoading } from "./../Slices/CartSlice";
import { CircularProgress } from "@mui/material";

const CartCard = ({ cartItems }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.loading); // Get loading state from Redux

  const removeFromCart = (dish) => {
    dispatch(setLoading());
    setTimeout(() => {
      handleRemoveCall(dish);
    }, 3000);
  };

  function handleRemoveCall(dish) {
    axios
      .delete(`http://localhost:3000/cart/${dish._id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setCart(response.data.cart));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(removeLoading());
      });
  }

  return (
    <div className="relative">
      {/* CircularProgress Overlay */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
          <CircularProgress />
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-300`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Carts Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {cartItems.map((item) => (
            <div
              key={item.dish._id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:shadow-2xl ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
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
                    onClick={() => removeFromCart(item.dish)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
