
import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateCounter } from "../../Slices/CounterSlice";
import { useDispatch } from "react-redux";
import { useRequestCall } from "../../hook"; 
import { ROLE } from "../../constraint";
import { notifySuccess } from "../../App";

const EditCounterModal = ({ counter, onClose, setLoading }) => {
  const [counterName, setCounterName] = useState(counter.name);
  const [imageUrl, setImageUrl] = useState(counter.image);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchants, setSelectedMerchants] = useState(
    counter.merchants.map((merchant) => merchant._id)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [callingGetRequest] = useRequestCall("get");
  const [callingPatchRequest] = useRequestCall("patch");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // const itemsPerPage = 5;

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all users for merchant selection
    setLoading(true);
    callingGetRequest(`${VITE_BACKEND_URL}/user?role=${ROLE.Merchant}&page=${currentPage}`)
    .then((response) => {
      setMerchants(response.data.users || []);
      setTotalPages(response.data.totalPages);
    })
    .catch((error) => {
      console.error("Error fetching merchants:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, [currentPage]);

  const handleMerchantChange = (merchantId) => {
    setSelectedMerchants((prev) =>
      prev.includes(merchantId)
        ? prev.filter((id) => id !== merchantId)
        : [...prev, merchantId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    callingPatchRequest(`${VITE_BACKEND_URL}/counter/${counter._id}`, 
      { name: counterName, merchants: selectedMerchants },
    )
    .then((response) => {
      dispatch(updateCounter(response.data.counter));
      notifySuccess("Counter updated successfully");
      onClose();
    })
    .catch((error) => {
      console.error("Error updating counter:", error);
    });
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-gray-300 opacity-50" onClick={onClose}></div>

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
          <div className="mb-4">
            <label className="block text-gray-700">Image Url</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setCounterName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Merchants with Pagination */}
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

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 text-gray-700 font-medium">
              <button
                type="button"
                className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <span className="mx-3">{currentPage} / {totalPages || 1}</span>
              <button
                type="button"
                className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
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
              className="px-4 py-2 bg-[#0a830a] text-white rounded-lg hover:bg-green-700"
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

