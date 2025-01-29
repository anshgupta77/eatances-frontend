import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";

import ManageCounterCard from "../components/ManageCounterCard";
import { setLoading, removeLoading } from "../Slices/AuthSlice";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
const ManageCounter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const loading = useSelector(state => state.auth.loading);
    console.log(counter);


    useEffect(() =>{
        dispatch(setLoading());
        // setTimeout(() => {
        //     handleGetCounterCall();
        // }, 3000);


    
            axios("http://localhost:3000/counter")
            .then(response => {
                console.log(response);
                dispatch(setCounter(response.data.counters))
            })
            .catch(error => console.log(error))
            .finally(() => {
                dispatch(removeLoading());
            })
    }, [])

    // function handleGetCounterCall(counter){
    //     axios("http://localhost:3000/counter")
    //     .then(response => {
    //         console.log(response);
    //         dispatch(setCounter(response.data.counters))
    //     })
    //     .catch(error => console.log(error))
    //     .finally(() => {
    //         dispatch(removeLoading());
    //     })
    // }

   
    return ( 
        <div>
            {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                <CircularProgress />
            </div>
            )}
            <ManageCounterCard counterData={counter}/>
        </div>
     );
}
 
export default ManageCounter;