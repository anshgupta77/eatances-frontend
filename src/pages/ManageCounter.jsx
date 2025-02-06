import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import ManageCounterCard from "../components/Cards/ManageCounterCard";
// import { setLoading, removeLoading } from "../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import AddCounter from "../components/Modals/AddCounter";
import { useRequestCall } from "../hook"; // Import the AddCounter component
import { ROLE } from "../constraint";
import { notifyError } from "../App";
import { useNavigate } from "react-router-dom";

const ManageCounter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const [loading, setLoading] = useState(false); ;
    const user = useSelector(state => state.auth.currentUser);
    const [isAddCounterOpen, setIsAddCounterOpen] = useState(false);
    const [callingRequest] = useRequestCall("get");  // State to control AddCounter modal
    const [error, setError] = useState(null);
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    useEffect(() => {
        // if(user?.role === ROLE.Admin){
            setLoading(true);
            callingRequest(`${VITE_BACKEND_URL}/counter`)
                .then(response => {
                    console.log(response);
                    dispatch(setCounter(response?.data?.counters || []));
                }).catch(error => {
                    console.error("Error fetching counters:", error);
                    setError(error?.response?.data?.message || "Unauthorised access");
                    dispatch(setCounter([]));
                }).finally(() => {
                    setLoading(false);
                });

                return () => {
                    dispatch(setCounter([]));
                }
        // } else {
        //     notifyError("Unauthorised access");
        //     navigate("/");
        // }
    }, []);

    return (
        <div className="p-6 min-h-[80vh] bg-gray-100">

            {error? <p className="text-red-500 text-center">{error}</p>: (
            <>
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => setIsAddCounterOpen(true)}
                        className="bg-[#0a830a] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Add Counter
                    </button>
                    <h1 className="text-3xl font-bold text-green-800 text-center flex-grow">
                        Manage Counters
                    </h1>
                </div>

            {/* Add Counter Modal */}
            {isAddCounterOpen && <AddCounter onClose={() => setIsAddCounterOpen(false)} setLoading={setLoading}/>}

            {/* <ManageCounterCard counterData={counter} /> */}
            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                    <CircularProgress />
                </div>
            ) : (
                <ManageCounterCard counterData={counter} />
            )}
             </>
            )} 
            
        </div>
    );
};

export default ManageCounter;
