// import React from 'react';
// import axios from 'axios';
// import userProfile from "../assets/userprofile.jpeg";
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { removeUser } from '../Slices/AuthSlice';
// const UserCard = ({ userData, onDelete }) => {
//     const loading = useSelector(state => state.auth.loading);
//     const dispatch = useDispatch();
//     const handleDelete = () => {
//         // Call the backend to delete the user
        
//         axios.delete(`http://localhost:3000/user/${userData._id}`)
//             .then(response => {
//                 console.log(response?.data?.user || {});
//                 dispatch(removeUser(response.data.user)); // Assuming the response contains the user data
//             })
//             .catch(error => {
//                 console.error("There was an error deleting the user!", error);
//             });
//     };
    

//     return (
//         <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-md mb-4">
//             {/* Avatar */}
//             <div className="flex-shrink-0">
//                 <img 
//                     src={userProfile} 
//                     alt={`${userData.name}'s Avatar`} 
//                     className="w-16 h-16 rounded-full object-cover"
//                 />
//             </div>
//             {/* User Info */}
//             <div className="flex-1">
//                 <h3 className="text-xl font-semibold text-gray-800">{userData.username}</h3>
//                 <p className="text-sm text-gray-600">{userData.email}</p>
//                 <p className="text-sm text-gray-600">{userData.role}</p>
//             </div>
//             {/* Actions */}
//             <div className="flex-shrink-0 space-x-2">
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                     View Profile
//                 </button>
//                 <button 
//                     onClick={handleDelete} 
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserCard;

