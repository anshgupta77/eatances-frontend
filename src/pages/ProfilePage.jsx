import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../Slices/AuthSlice";
import { useEffect } from "react";
const ProfilePage = () => {
    const user = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

    function handleLogout() {
        dispatch(removeCurrentUser());
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        navigate("/loginsignup");
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 px-4 py-8">
            <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    {/* Profile Avatar */}
                    <div className="w-24 h-24 bg-[#228B22]/10 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#228B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-6">Profile Details</h1>

                    {user ? (
                        <div className="w-full space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500 mb-1">Username</p>
                                <p className="text-lg font-semibold text-blue-950">{user.username}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="text-lg font-semibold text-blue-950">{user.email}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-sm text-gray-500 mb-1">Role</p>
                                <div className="flex items-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#228B22]/10 text-[#228B22]">
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={handleLogout} 
                                className="w-full mt-6 bg-[#228B22] text-white py-3 px-6 rounded-xl shadow-md hover:bg-[#228B22]/90 transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center p-4">
                            <div className="w-8 h-8 border-4 border-[#228B22] border-t-transparent rounded-full animate-spin"></div>
                            <p className="ml-2 text-gray-500">Loading user data...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
