import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "../Slices/CounterSlice";
import CounterCard from "../components/CounterCard";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Scope from "../components/Scope";
import Brand from "../components/Brand";
const HomePage = () => {
    return ( 
        <div className="">
            <Carousel />
            <Scope />
            <Brand/>
        </div>
     );
}
 
export default HomePage;
