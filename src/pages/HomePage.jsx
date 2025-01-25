import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/CounterCard";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Scope from "../components/Scope";
const HomePage = () => {
    return ( 
        <div className="w-[90vw] mx-auto">
            <Carousel />
            <Scope />
        </div>
     );
}
 
export default HomePage;
