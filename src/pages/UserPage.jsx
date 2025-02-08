

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import UserCard from "../components/Cards/UserCard";
import { setUser } from "../Slices/UserSlice";
import { useRequestCall } from "../hook";
import { notifyError } from "../App";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

const UserPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.items);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [role, setRole] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [callingRequest] = useRequestCall("get");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchUsers = (selectedRole, currentPage) => {
        const url = `${VITE_BACKEND_URL}/user?page=${currentPage}&${
            selectedRole ? `&role=${selectedRole}` : ""
        }`;

        setLoading(true);
        callingRequest(url)
            .then((response) => {
                setTotalPages(response.data.totalPages);
                dispatch(setUser(response.data.users));
            })
            .catch((error) => {
                notifyError(error?.response?.data?.message || "Unauthorised access");
                navigate("/");
                dispatch(setUser([]));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers(role, currentPage);
        window.scrollTo(0, 0);
    }, [role, currentPage]);

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
                <LoadingOverlay />
            ) : error ? (
                <p className="text-red-500 text-center text-lg">{error}</p>
            ) : (
                <div className="max-w-7xl mx-auto">
                    {/* Role Selection */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-blue-950">User <span className="text-[#228822]">Management</span></h1>
                        <select
                            name="role"
                            id="role"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-1/10 p-2 border rounded-r-full rounded-l-full bg-gray-200  focus:ring-1 focus:ring-[#228822] focus:border-[#308030e0] text-[#228B22] font-medium"
                        >
                            <option value="">All Users</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                            <option value="merchant">Merchant</option>
                        </select>
                    </div>

                    {/* Users Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <UserCard key={user.id} userData={user} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">No users found</p>
                        )}
                    </div>

                    {/* Pagination */}
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
            )}
        </div>
    );
};

export default UserPage;