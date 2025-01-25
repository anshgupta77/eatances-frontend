import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/CounterCard";
import { Link } from "react-router-dom";
const HomePage = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.counters)
    useEffect(() =>{
        axios("http://localhost:3000/counter")
        .then(response => {
            console.log(response);
            dispatch(setCounter(response.data.counters))
        })
        .catch(error => console.log(error))
    }, [])

   
    return ( 
        <div>
            <CounterCard counterData={counter}/>
        </div>
     );
}
 
export default HomePage;
