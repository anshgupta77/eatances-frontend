import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateCounter } from "../../Slices/CounterSlice";
import { useDispatch } from "react-redux";
import { useRequestCall } from "../../hook"; 

const EditCounterModal = ({ counter, onClose }) => {
  const [counterName, setCounterName] = useState(counter.name);
  const [merchants, setMerchants] = useState([]);
  const [callingPatchRequest] = useRequestCall("patch");
  const [callingGetRequest] = useRequestCall("get");
  console.log("Counter the edit page ");
  const [selectedMerchants, setSelectedMerchants] = useState(
    counter.merchants.map((merchant) => merchant._id)
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Fetch all users for merchant selection
   
    axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
      .then((response) => {
        console.log(response?.data?.users || []);
        setMerchants(response.data.users)
    })
  }, []);

  const handleMerchantChange = (merchantId) => {
    setSelectedMerchants((prev) =>
      prev.includes(merchantId)
        ? prev.filter((id) => id !== merchantId)
        : [...prev, merchantId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated counter details to the backend
    axios.patch(`http://localhost:3000/counter/${counter._id}`, {
        name: counterName,
        merchants: selectedMerchants,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        console.log("Counter updated:", response.data.counter);
         dispatch(updateCounter(response.data.counter))// Close the modal after submission
      })
      .catch((error) => {
        console.error("Error updating counter:", error);
      }).finally(() => {
        onClose();
      })
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-gray-300 opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4">Edit Counter</h2>
        <form onSubmit={handleSubmit}>
          {/* Counter Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Counter Name</label>
            <input
              type="text"
              value={counterName}
              onChange={(e) => setCounterName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Merchants */}
          <div className="mb-4">
            <label className="block text-gray-700">Assign Merchants</label>
            <div className="space-y-2">
              {merchants.map((merchant) => (
                <div key={merchant._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={merchant._id}
                    checked={selectedMerchants.includes(merchant._id)}
                    onChange={() => handleMerchantChange(merchant._id)}
                    className="mr-2"
                  />
                  <label htmlFor={merchant._id} className="text-gray-700">
                    {merchant.username}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCounterModal;
