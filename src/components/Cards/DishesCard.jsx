import React from "react";
import axios from "axios";
import { useDispatch , useSelector} from "react-redux";
import { removeDish } from "../../Slices/DishSlice";
import { setCart } from "../../Slices/CartSlice";
import { useState } from "react";
import EditDish from "../Modals/EditDish";
import { Link, useParams } from "react-router-dom";
import { useRequestCall } from "../../hook";
import editIcon from "../../assets/editImage.png";
import deleteIcon from "../../assets/delete.png";
// import { removeLoading, setLoading } from "../../Slices/UserSlice";
import { ROLE } from "../../constraint";
import { notifyError, notifySuccess } from "../../App";
import DeleteConfirmationModal from "../Modals/DeleteConfirm";

const DishCard = ({ dishes, counterId ,setLoading }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [callingPostRequest] = useRequestCall("post");
  const [callingDeleteRequest] = useRequestCall("delete");
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [patchLoading, setPatchLoading] = useState(false)
  const loading = deleteLoading || patchLoading
  const items = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.currentUser);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // const counterId = useParams()
  console.log("CounterId", counterId);
  

  function isInCart(dish){
    return items.some(item => {
      if(item.dish){
        return item.dish._id === dish._id;
      }
    });
  }
  const openEditModal = (dish) => {
    setCurrentDish(dish);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setCurrentDish(null);
    setIsEditing(false);
  };

  const handleDeleteClick = (dish) => {
    setCurrentDish(dish);
    setShowDeleteModal(true);
  }


  function addItemToCart(dish){
    callingPostRequest("http://localhost:3000/cart", {dish: dish._id})
    .then(response =>{
        console.log(response);
        dispatch(setCart(response?.data?.cart || []));
        notifySuccess("Dish added to cart successfully");
    }).catch(error =>{
        console.error("Error adding dish to cart:", error);
        notifyError(error?.response?.data?.message || "Failed to add dish to cart");
    })
  }




  function deleteDish(id){
    callingDeleteRequest(`${VITE_BACKEND_URL}/dish/${id}`,{
      counterId: counterId
    })
    .then(response =>{
        console.log(response.data);
        dispatch(removeDish(response.data.dish));
        notifySuccess("Dish Deleted Successfully");
    }).catch(error =>{
      notifyError(error?.response?.data?.message || "Something went wrong");
    })
  }



  
  return (
    <>
      {isEditing && (
        <EditDish dish={currentDish} onClose={closeEditModal} counterId={counterId} setLoading={setLoading} />
      )}

    
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="bg-white rounded-2xl border-1 border-gray-600 hover:shadow-lg"
          >
            <div className="relative h-60 w-[90%] mx-auto mt-3 border-2 border-gray-200 rounded-lg">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full object-cover h-full"
              />

            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {dish.name}
                </h2>
                {counterId && user && (user.role===ROLE.Merchant) &&<div className="flex space-x-4">
                    <img src={editIcon} alt="" onClick={() => openEditModal(dish)} className="w-5 h-5 cursor-pointer hover:opacity-75"/>
                    {/* <img src={deleteIcon} alt="" onClick={() => deleteDish(dish._id)} className="w-5 h-5 cursor-pointer hover:opacity-75"/> */}

                    <img src={deleteIcon} alt="" onClick={() => handleDeleteClick(dish)} className="w-5 h-5 cursor-pointer hover:opacity-75"/>
                  </div>}

              </div>
              <p className="text-sm text-gray-600 mb-4">{dish.description}</p>
              <p className="text-sm font-semibold text-[#0a830a]">
                Category: {dish.category}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                ₹{dish.price}
              </p>
              {dish.inStock ? (
                <p className="text-sm text-[#228B22] font-medium mt-2">
                  In Stock
                </p>
              ) : (
                <p className="text-sm text-red-500 font-medium mt-2">
                  Out of Stock
                </p>
              )}
              {user && (user.role===ROLE.Customer) &&<div className="flex justify-between mt-6 items-center">

                
             -
                {isInCart(dish) ? (
                  <Link to="/cart" className="w-full"><button
                  className="bg-yellow-400 text-black w-full px-4 py-2 rounded-lg hover:bg-yellow-500">  <span className="text-sm text-black">Go to Cart</span></button></Link>
                ):(
                  <button
                  onClick={()=>addItemToCart(dish)}
                  className="bg-blue-600 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                )}
                
             
               
              </div>}
            </div>
          </div>
        ))}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() =>deleteDish(currentDish?._id)}
        DeleteDataName={currentDish?.name}
      />
      </div>
    </>
  );
};

export default DishCard;

