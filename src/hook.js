import axios from "axios";
import { useState } from "react";

// Custom hook for making API requests
export function useRequestCall(method) {
  const [loading, setLoading] = useState(false);

  const call = async (url, body) => {
    setLoading(true); // Set loading state to true
    try {
      // Introduce a delay before making the API call
      await delay(3000); 

      // Make the API call
      return await axios.request(axiosConfig(method, url, body));
 
    } catch (error) {
      console.error(`Error in the ${method} method`, error.message);
      throw error; // Rethrow error for further handling if needed
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return [loading, call];
}

// Helper function for adding delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Axios configuration
function axiosConfig(method, url, body) {
  return {
    method: method,
    url: url,
    data: body,
  };
}
