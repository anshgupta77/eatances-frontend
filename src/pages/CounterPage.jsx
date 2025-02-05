import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/Cards/CounterCard";
// import { setLoading, removeLoading } from "../Slices/UserSlice";
import { CircularProgress } from "@mui/material";
import { useRequestCall } from "../hook";
import Restuarant from "../assets/resturants.avif"
import { Link } from "react-router-dom";
const CounterPage = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.items);
    const loading = useSelector(state => state.user.loading);
    const [callingRequest] = useRequestCall("get");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    console.log(counter);
    useEffect(() =>{
        window.scrollTo(0,0);
        callingRequest(`${VITE_BACKEND_URL}/counter`)
            .then(response => {
                console.log(response);
                dispatch(setCounter(response.data.counters))
            })

            return () => {
                dispatch(setCounter([]));
            }
    }, [])

    return ( 
        <div className="min-h-screen">
            <img src={Restuarant} alt="" className="h-[50vh] w-full object-cover"/>
            {loading ? (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
                <CircularProgress />
            </div>
            ) :(
                <div className="min-h-screen">
                    <CounterCard counterData={counter}/>    
                </div>
            )}
        </div>
     );
}
 
export default CounterPage;


