


import React, { useState } from 'react';
import axios from 'axios';
import userProfile from "../../assets/userprofile.jpeg";
import { useSelector, useDispatch } from 'react-redux';
import { removeUser , updateUser} from '../../Slices/UserSlice';
import { useRequestCall } from '../../hook';

const UserCard = ({ userData}) => {
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState(userData.role);
    const [callingPatchRequest] = useRequestCall("patch");
    const [callingDeleteRequest] = useRequestCall("delete");
    // Handle role change
    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        callingPatchRequest(`http://localhost:3000/user/${userData._id}/role`, { role: newRole })
            .then(response => {
                console.log("Updated user role:", response.data.user);
                dispatch(updateUser(response.data.user)); // Assuming the response contains the updated user data
            })
    };
    

    // Handle user deletion
    const handleDelete = () => {
        callingDeleteRequest(`http://localhost:3000/user/${userData._id}`)
            .then(response => {
                console.log(response?.data?.user || {});
                dispatch(removeUser(response.data.user)); // Assuming the response contains the user data
            })
    };

    return (
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-md mb-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <img 
                    src={userProfile} 
                    alt={`${userData.username}'s Avatar`} 
                    className="w-16 h-16 rounded-full object-cover"
                />
            </div>

            {/* User Info */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{userData.username}</h3>
                <p className="text-sm text-gray-600">{userData.email}</p>

                {/* Role Selection */}
                <select 
                    value={selectedRole} 
                    onChange={handleRoleChange}
                    className="mt-2 p-2 border-collapse border-hidden outline-hidden rounded-md"
                >
                    <option value="admin">Admin</option>
                    <option value="merchant">Merchant</option>
                    <option value="customer">Customer</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    View Profile
                </button>
                <button 
                    onClick={handleDelete} 
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;


