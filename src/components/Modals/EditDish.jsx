import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDish , updateDish} from "../../Slices/DishSlice";
// import { setLoading, removeLoading } from "../../Slices/UserSlice";
import { useRequestCall } from "../../hook";
import { notifyError, notifySuccess } from "../../App";


const EditDish = ({ dish, onClose, counterId }) => {
  const loading = useSelector((state) => state.user.loading); // Get loading state from Redux
  const [updatedDish, setUpdatedDish] = useState({ ...dish });
  const [callingRequest] = useRequestCall("patch");
  const dispatch = useDispatch();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDish({ ...updatedDish, [name]: value });
  };

  const saveChanges = () => {
    console.log("dish id:", dish._id);
    callingRequest(`${VITE_BACKEND_URL}/dish/${dish._id}`, {
        updatedDish: updatedDish,
        counterId: counterId,
      })
      .then((response) => {
        console.log("Updated dish:", response.data);
        const updatedDish = response.data.dish;
        dispatch(updateDish({updatedDish: updatedDish, id: dish._id}))
        notifySuccess("Dish updated successfully");
      })
      .catch((error) => {
        window.scrollTo(0,0);
        console.error("Error updating dish:", error.response.data.message);
        notifyError(error.response.data.message);
      })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Darkened Background */}
      <div
        className="absolute inset-0 bg-gray-400 opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed bg-white p-6 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-xl font-bold mb-4">Edit Dish</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={updatedDish.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={updatedDish.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={updatedDish.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image Url
          </label>
          <input
            type="text"
            name="image"
            value={updatedDish.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Availability
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="inStock"
                value="true"
                checked={updatedDish.inStock === true}
                onChange={() => setUpdatedDish({ ...updatedDish, inStock: true })}
                className="form-radio text-blue-500"
              />
              <span>In Stock</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="inStock"
                value="false"
                checked={updatedDish.inStock === false}
                onChange={() => setUpdatedDish({ ...updatedDish, inStock: false })}
                className="form-radio text-blue-500"
              />
              <span>Out of Stock</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={updatedDish.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDish;
