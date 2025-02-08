
import React, { useState } from "react";
import EditCounterModal from "../Modals/EditCounter";
import DeleteConfirmationModal from "../Modals/DeleteConfirm";
import { useDispatch } from "react-redux";
import { deleteCounter } from "../../Slices/CounterSlice";
import { useRequestCall } from "../../hook";
import { notifySuccess } from "../../App";

const ManageCounterCard = ({ counterData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [callingRequest] = useRequestCall("delete");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleEditClick = (counter) => {
    setSelectedCounter(counter);
    setShowEditModal(true);
  };

  const handleDeleteClick = (counter) => {
    setSelectedCounter(counter);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    callingRequest(`${VITE_BACKEND_URL}/counter/${selectedCounter._id}`)
      .then(response => {
        dispatch(deleteCounter(response?.data?.counter || {}));
        notifySuccess("Counter deleted successfully");
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error("Error deleting counter:", error);
      })
      .finally(() => {
        setLoading(false);
        setSelectedCounter(null);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-8">
      {counterData.map((counter) => (
        <div
          key={counter._id}
          className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col">
            {/* Counter Icon */}
            <div className="w-16 h-16 bg-[#228B22]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#228B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            {/* Counter Name */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-500 mb-1">Counter Name</p>
              <p className="text-lg font-semibold text-blue-950">{counter.name}</p>
            </div>

            {/* Merchants Section */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Assigned Merchants</p>
              {counter.merchants && counter.merchants.length > 0 ? (
                <div className="space-y-2">
                  {counter.merchants.map((merchant) => (
                    <div
                      key={merchant._id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#228B22]/10 text-[#228B22] mr-2 mb-2"
                    >
                      {merchant.username}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No merchants assigned</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleEditClick(counter)}
                className="flex-1 bg-[#228B22]/10 text-[#228B22] py-2 px-4 rounded-xl hover:bg-[#228B22]/20 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(counter)}
                className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-xl hover:bg-red-200 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Counter Modal */}
      {showEditModal && selectedCounter && (
        <EditCounterModal
          counter={selectedCounter}
          onClose={() => setShowEditModal(false)}
          setLoading={setLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        DeleteDataName={selectedCounter?.name}
      />
    </div>
  );
};

export default ManageCounterCard;