import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import ManageCounterCard from "../components/Cards/ManageCounterCard";
import { setLoading, removeLoading } from "../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import AddCounter from "../components/Modals/AddCounter";
import { useRequestCall } from "../hook"; // Import the AddCounter component

const ManageCounter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const loading = useSelector(state => state.user.loading);
    const [isAddCounterOpen, setIsAddCounterOpen] = useState(false);
   const [callingRequest] = useRequestCall("get");  // State to control AddCounter modal

    useEffect(() => {
        callingRequest("http://localhost:3000/counter")
            .then(response => {
                console.log(response);
                dispatch(setCounter(response?.data?.counters || []));
            })
    }, []);

    return (
        <div className="p-6 min-h-[80vh]">
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => setIsAddCounterOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Add Counter
                </button>
                <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
                    Counters List
                </h1>
            </div>

            {/* Add Counter Modal */}
            {isAddCounterOpen && <AddCounter onClose={() => setIsAddCounterOpen(false)} />}

            <ManageCounterCard counterData={counter} />
            {/* {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                    <CircularProgress />
                </div>
            ) : (
                <ManageCounterCard counterData={counter} />
            )} */}
        </div>
    );
};

export default ManageCounter;
