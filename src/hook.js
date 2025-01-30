import axios from "axios";
import { useState } from "react";
import { setLoading, removeLoading } from "./Slices/UserSlice";
import { useDispatch } from "react-redux";

// Custom hook for making API requests
export function useRequestCall(method) {
  const dispatch = useDispatch();
  const call = async (url, body) => {
    dispatch(setLoading()) // Set loading state to true
    try {
      // Introduce a delay before making the API call
      // await delay(3000); 

      // Make the API call
      const token = localStorage.getItem("token");
      return await axios.request(axiosConfig(method, url, body, token));
 
    } catch (error) {
      console.error(`Error in the ${method} method`, error.message);
      throw error; // Rethrow error for further handling if needed
    } finally {
      dispatch(removeLoading()) // Reset loading state
    }
  };

  return [call];
}

// Helper function for adding delay

// Axios configuration
function axiosConfig(method, url, body, token) {
  // console.log("Token ",token)
  return {
    method: method,
    url: url,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}
