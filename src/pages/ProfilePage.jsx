import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../Slices/AuthSlice";

const ProfilePage = () => {
    const user = useSelector(state => state.auth.currentUser);
    // console.log("profile",user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(removeCurrentUser());
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        navigate("/loginsignup");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6 w-96 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">Profile Page</h1>
                {/* <p className="text-lg text-gray-600 mt-2">Welcome, <span className="font-medium text-gray-800">{user.username}</span></p>
                <p className="text-gray-500 text-sm mt-1">Email: {user.email}</p>
                <p className="text-gray-500 text-sm mt-1">Role: {user.role}</p> */}

                {user ? ( // Ensure user exists before accessing properties
                <>
                    <p className="text-lg text-gray-600 mt-2">
                        Welcome, <span className="font-medium text-gray-800">{user.username}</span>
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Email: {user.email}</p>
                    <p className="text-gray-500 text-sm mt-1">Role: {user.role}</p>
                </>
            ) : (
                <p className="text-gray-500 text-sm mt-1">Loading user data...</p>
            )}

                <button 
                    onClick={handleLogout} 
                    className="mt-5 bg-green-500 text-white py-2 px-5 rounded-lg shadow-md hover:bg-green-600 transition-all">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
