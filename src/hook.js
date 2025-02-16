import axios from "axios";
import { useState } from "react";

import { useDispatch } from "react-redux";

// Custom hook for making API requests
export function useRequestCall(method) {
  const dispatch = useDispatch();
  const call = async (url, body) => {
    try {
      const token = localStorage.getItem("token");
      console.log("url", url, " Token ", token);
      return await axios.request(axiosConfig(method, url, body, token));

    } catch (error) {
      console.error(`Error in the ${method} method`, error.message);
      throw error; // Rethrow error for further handling if needed
    }
  };

  return [call];
}

export function useRequestWithoutToken(method) {
  const dispatch = useDispatch();
  const call = async (url, body) => {
    try {
      // const token = localStorage.getItem("token");
      return await axios.request(axiosConfig(method, url, body));
    } catch (error) {
      console.error(`Error in the ${method} method`, error.message);
      throw error; // Rethrow error for further handling if needed
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
