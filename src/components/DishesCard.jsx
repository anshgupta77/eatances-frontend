// import React from "react";

// const DishCard = ({ dishes }) => {
//   return (
//     <>
//     <h1 className="text-2xl font-bold mb-6">Dishes Menu</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {dishes.map((dish) => (
//           <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
//       <img
//         src={dish.image}
//         alt={dish.name}
//         className="w-full h-48 object-cover rounded-lg mb-4"
//       />
//       <h2 className="text-lg font-bold text-gray-800">{dish.name}</h2>
//       <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
//       <p className="text-sm font-semibold text-green-600 mb-2">
//         Category: {dish.category}
//       </p>
//       <p className="text-lg font-semibold text-gray-800">₹{dish.price}</p>
//       {dish.inStock ? (
//         <p className="text-sm text-green-500 font-medium">In Stock</p>
//       ) : (
//         <p className="text-sm text-red-500 font-medium">Out of Stock</p>
//       )}
//     <div className="flex justify-center mt-4">
//         <button onClick={() => addItemToCart(product, product.id)}
//         className="w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"><span className="text-sm text-white">Add to Cart</span></button>
//     </div>
//     </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default DishCard;




// import React from "react";

// const DishCard = ({ dishes }) => {
//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-6">Dishes Menu</h1>
//       <div className="grid grid-cols-1 gap-6">
//         {dishes.map((dish) => (
//           <div
//             key={dish._id}
//             className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-row items-center gap-x-4"
//           >
//             <img
//               src={dish.image}
//               alt={dish.name}
//               className="w-48 h-48 object-cover rounded-lg"
//             />
//             <div className="flex flex-col flex-grow">
//               <h2 className="text-lg font-bold text-gray-800">{dish.name}</h2>
//               <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
//               <p className="text-sm font-semibold text-green-600 mb-2">
//                 Category: {dish.category}
//               </p>
//               <p className="text-lg font-semibold text-gray-800">₹{dish.price}</p>
//               {dish.inStock ? (
//                 <p className="text-sm text-green-500 font-medium">In Stock</p>
//               ) : (
//                 <p className="text-sm text-red-500 font-medium">Out of Stock</p>
//               )}
//               <div className="flex justify-center mt-4">
//                 <button
//                   onClick={() => addItemToCart(dish, dish._id)}
//                   className="w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 >
//                   <span className="text-sm text-white">Add to Cart</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default DishCard;


import React from "react";

const DishCard = ({ dishes }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Dishes Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
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
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => addItemToCart(dish, dish._id)}
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

export default DishCard;

