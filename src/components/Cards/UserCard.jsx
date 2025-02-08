
// import React from "react";
// import { useDispatch } from "react-redux";
// import { removeUser, updateUser } from "../../Slices/UserSlice";
// import { useRequestCall } from "../../hook";
// import userProfile from "../../assets/userprofile.jpeg";
// import { X } from "lucide-react"; // Importing cross icon

// const UserCard = ({ userData }) => {
//     const dispatch = useDispatch();
//     const [callingPatchRequest] = useRequestCall("patch");
//     const [callingDeleteRequest] = useRequestCall("delete");
//     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//     const handleRoleChange = (event) => {
//         const newRole = event.target.value;
//         callingPatchRequest(`${VITE_BACKEND_URL}/user/${userData._id}/role`, { role: newRole })
//             .then((response) => {
//                 dispatch(updateUser(response.data.user));
//             });
//     };

//     const handleDelete = () => {
//         callingDeleteRequest(`${VITE_BACKEND_URL}/user/${userData._id}`).then((response) => {
//             dispatch(removeUser(response.data.user));
//         });
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden relative p-4">
//             {/* Close Button (Cross) */}
//             <button
//                 onClick={handleDelete}
//                 className="absolute top-2 right-2 rounded-full bg-white text-red-500 hover:text-red-600 transition-colors mb-4 "
//             >
//                 <X size={30} />
//             </button>

//             <div className="flex flex-col sm:flex-row items-center gap-4">
//                 {/* Avatar */}
//                 <div className="flex-shrink-0">
//                     <img
//                         src={userProfile}
//                         alt={`${userData.username}'s Avatar`}
//                         className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover"
//                     />
//                 </div>

//                 {/* User Info */}
//                 <div className="flex-1 text-center sm:text-left">
//                     <h3 className="text-xl font-semibold text-gray-800">{userData.username}</h3>
//                     <p className="text-sm text-gray-600 mt-1">{userData.email}</p>

//                     {/* Role Selection */}
//                         <div className="mt-3">
//                             <select
//                                 value={userData.role}
//                                 onChange={handleRoleChange}
//                                 className="w-full sm:w-auto p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             >
//                                 <option value="admin">Admin</option>
//                                 <option value="merchant">Merchant</option>
//                                 <option value="customer">Customer</option>
//                             </select>
//                         </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserCard;




import React from "react";
import { useDispatch } from "react-redux";
import { removeUser, updateUser } from "../../Slices/UserSlice";
import { useRequestCall } from "../../hook";
import userProfile from "../../assets/userprofile.jpeg";
import { X } from "lucide-react"; // Importing cross icon

const UserCard = ({ userData }) => {
    const dispatch = useDispatch();
    const [callingPatchRequest] = useRequestCall("patch");
    const [callingDeleteRequest] = useRequestCall("delete");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        callingPatchRequest(`${VITE_BACKEND_URL}/user/${userData._id}/role`, { role: newRole })
            .then((response) => {
                dispatch(updateUser(response.data.user));
            });
    };

    const handleDelete = () => {
        callingDeleteRequest(`${VITE_BACKEND_URL}/user/${userData._id}`).then((response) => {
            dispatch(removeUser(response.data.user));
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-[100%] max-w-md mx-auto">
            <div className="flex flex-col items-center relative">
                {/* Close Button (Cross) */}
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 rounded-full bg-white text-[#228822] hover:text-[#397139] transition-colors hover:font-bold"
                >
                    <X size={24} />
                </button>

                {/* Avatar */}
                {/* <div className="w-24 h-24 bg-[#228B22]/10 rounded-full flex items-center justify-center mb-4">
                    <img
                        src={userProfile}
                        alt={`${userData.username}'s Avatar`}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                </div> */}

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
        </div>
    );
};

export default UserCard;