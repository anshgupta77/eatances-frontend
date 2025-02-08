
import React from "react";
import { useDispatch } from "react-redux";
import { removeUser, updateUser } from "../../Slices/UserSlice";
import { useRequestCall } from "../../hook";
import userProfile from "../../assets/userprofile.jpeg";
import { X } from "lucide-react"; // Importing cross icon
import DeleteConfirmationModal from "../Modals/DeleteConfirm";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../App";

const UserCard = ({ userData }) => {
    const dispatch = useDispatch();
    const [callingPatchRequest] = useRequestCall("patch");
    const [callingDeleteRequest] = useRequestCall("delete");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
     const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        callingPatchRequest(`${VITE_BACKEND_URL}/user/${userData._id}/role`, { role: newRole })
            .then((response) => {
                dispatch(updateUser(response.data.user));
            });
    };
    const handleDeleteClick = () => {
        setShowDeleteModal(true);
      }

    const deleteUser = () => {
        callingDeleteRequest(`${VITE_BACKEND_URL}/user/${userData._id}`).then((response) => {
            dispatch(removeUser(response.data.user));
            notifySuccess("User Deleted Successfully");
        }).catch((error) => {
            notifyError(error?.response?.data?.message || "Error deleting user");
        });

    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-[100%] max-w-md mx-auto">
            <div className="flex flex-col items-center relative">
                {/* Close Button (Cross) */}
                <button
                    onClick={handleDeleteClick}
                    className="absolute top-2 right-2 rounded-full bg-white text-[#228822] hover:text-[#397139] transition-colors hover:font-bold"
                >
                    <X size={24} />
                </button>


                    <div className="w-24 h-24 bg-[#228B22]/10 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#228B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>

                {/* User Info */}
                <div className="w-full space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-blue-950 mb-1">Username</p>
                        <p className="text-lg font-semibold text-blue-950">{userData.username}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-blue-950 mb-1">Email</p>
                        <p className="text-lg font-semibold text-blue-950">{userData.email}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-blue-950 mb-1">Role</p>
                        <div className="flex items-center">
                            <select
                                value={userData.role}
                                onChange={handleRoleChange}
                                className="w-1/2 p-2 border rounded-r-full rounded-l-full bg-gray-200  focus:ring-1 focus:ring-[#228822] focus:border-[#308030e0] text-[#228B22] font-medium"
                            >
                                <option value="admin" className="bg-gray-100">Admin</option>
                                <option value="merchant" className="bg-gray-100">Merchant</option>
                                <option value="customer" className="bg-gray-100">Customer</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={deleteUser}
                DeleteDataName={userData?.username}
            />
        </div>
    );
};

export default UserCard;