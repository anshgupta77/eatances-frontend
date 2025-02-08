import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/Cards/CounterCard";
// import { setLoading, removeLoading } from "../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import { useRequestCall } from "../hook";
import Restuarant from "../assets/resturants.avif"
import { Link } from "react-router-dom";
import WeOffer from "../components/WeOffer";
import LoadingOverlay from "../components/LoadingOverlay";
const CounterPage = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const [loading, setLoading] = useState(false);
    const [callingRequest] = useRequestCall("get");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    console.log(counter);
    useEffect(() =>{
        window.scrollTo(0,0);
        setLoading(true);
        callingRequest(`${VITE_BACKEND_URL}/counter`)
            .then(response => {
                console.log(response);
                dispatch(setCounter(response.data.counters))
            }).catch(error => {
                console.error("Error fetching counters:", error);
            }).finally(() =>{
                setLoading(false);
            });

            return () => {
                dispatch(setCounter([]));
            }
    }, [])

    return ( 
        <div className="min-h-screen">
            <img src={Restuarant} alt="" className="h-[50vh] w-full object-cover"/>
            {loading ? (
            
            <LoadingOverlay />
            ) :(
                <div className="min-h-[50vh]">
                    <CounterCard counterData={counter}/>    
                </div>
            )}
            <WeOffer/>
        </div>
     );
}
 
export default CounterPage;


