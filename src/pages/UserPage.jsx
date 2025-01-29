import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { setUsers } from "../Slices/UserSlice"; // Assuming you have a slice for users
import UserCard from "../components/UserCard"; // Assuming a component to display user info
import { setLoading, removeLoading, setUser } from "../Slices/AuthSlice";
import { CircularProgress } from "@mui/material";
// import { setUser } from "../Slices/AuthSlice";

const UserPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.auth.items);
    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        dispatch(setLoading());
        axios("http://localhost:3000/user") // Replace with your backend URL
            .then(response => {
                console.log(response);
                console.log(response?.data?.users || []);
                dispatch(setUser(response.data.users)); // Assuming the response contains users data
            })
            .catch(error => console.log(error))
            .finally(() => {
                dispatch(removeLoading());
            });
    }, []);

    return ( 
        <div>
            {loading ? (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                {console.log("loading")}
                <CircularProgress />
            </div>
            ) : (
                <div>
                {users && users.length > 0 ? (
                    users.map(user => (
                        <UserCard key={user.id} userData={user} /> // Display each user in a card
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
            )}
        </div>
     );
}

export default UserPage;
