
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { CircularProgress } from "@mui/material";
// import UserCard from "../components/Cards/UserCard";
// import { setUser } from "../Slices/UserSlice";
// import { useRequestCall } from "../hook";

// const UserPage = () => {
//     const dispatch = useDispatch();
//     const users = useSelector((state) => state.user.items);
//     const loading = useSelector((state) => state.user.loading);

//     const [role, setRole] = useState(""); // Default: No role selected
//     const [callingRequest] = useRequestCall("get");

//     const fetchUsers = (selectedRole) => {
//         const url = selectedRole ? 
//             `http://localhost:3000/user?role=${selectedRole}` : 
//             `http://localhost:3000/user`; // Fetch all users if no role is selected

//         callingRequest(url)
//             .then((response) => {
//                 console.log(response.data?.users || []);
//                 dispatch(setUser(response.data.users));
//             })
//             .catch((error) => {
//                 console.error("Error fetching users:", error);
//                 dispatch(setUser([]));
//             });
//     };

//     useEffect(() => {
//         fetchUsers(role); // Fetch based on selected role (or all if empty)
//         return () => dispatch(setUser([])); // Cleanup on unmount
//     }, [role]); // Re-fetch when role changes

//     return (
//         <div>
//             {loading ? (
//                 <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
//                     {console.log("loading")}
//                     <CircularProgress />
//                 </div>
//             ) : (
//                 <div className="bg-gray-100">
//                     {/* Role Selection */}
//                     <div className="flex items-center justify-end space-x-4 p-4">
//                         <select 
//                             name="role" 
//                             id="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             className="p-2 border rounded-md"
//                         >
//                             <option value="">All Users</option>
//                             <option value="admin">Admin</option>
//                             <option value="customer">Customer</option>
//                             <option value="merchant">Merchant</option>
//                         </select>

//                     </div>

//                     {/* Users List */}
//                     <div>
//                         {users && users.length > 0 ? (
//                             users.map((user) => (
//                                 <UserCard key={user.id} userData={user} />
//                             ))
//                         ) : (
//                             <p>No users found</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserPage;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import UserCard from "../components/Cards/UserCard";
import { setUser } from "../Slices/UserSlice";
import { useRequestCall } from "../hook";
import { notifyError } from "../App";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.items);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [role, setRole] = useState(""); // Default: No role selected
    const [page, setPage] = useState(1); // Fixed limit per page
    const navigate = useNavigate()
    const [error , setError] = useState(null);
    const [callingRequest] = useRequestCall("get");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const fetchUsers = (selectedRole, currentPage) => {
        const url = `${VITE_BACKEND_URL}/user?page=${currentPage}&${
            selectedRole ? `&role=${selectedRole}` : ""
        }`;

        callingRequest(url)
            .then((response) => {
                console.log(response.data);
                console.log(response.data?.users || []);
                setTotalPages(response.data.totalPages);
                dispatch(setUser(response.data.users));
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                // setError(error?.response?.data?.message || "Unauthorised access");
                notifyError(error?.response?.data?.message || "Unauthorised access");
                navigate("/");
                dispatch(setUser([]));
            }).finally(() =>{
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers(role, page); // Fetch based on role & page
    }, [role, page]); // Re-fetch when role or page changes

    console.log("Total Pages: ", totalPages);
    return (
        <div className="min-h-[80vh]  bg-gray-100">
            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                    {console.log("loading")}
                    <CircularProgress />
                </div>
            ) : (
                error? <p className="text-red-500 text-center">{error}</p>:(
                <div className="bg-gray-100">
                    {/* Role Selection */}
                    <div className="flex items-center justify-end space-x-4 p-4">
                        <select
                            name="role"
                            id="role"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value);
                                setPage(1); // Reset page on role change
                            }}
                            className="p-2 border rounded-md"
                        >
                            <option value="">All Users</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                            <option value="merchant">Merchant</option>
                        </select>
                    </div>

                    {/* Users List */}
                    <div>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <UserCard key={user.id} userData={user} />
                            ))
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center space-x-4 p-4">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className={`px-4 py-2 rounded-md ${
                                page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
                            }`}
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2">Page {page}</span>

                        <button
                            onClick={() => setPage((prev) => Math.max(prev + 1))}
                            disabled={page === totalPages}
                            className={`px-4 py-2 rounded-md ${
                                page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
                )
            )}
        </div>
    );
};

export default UserPage;


