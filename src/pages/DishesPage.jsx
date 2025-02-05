import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDish } from "./../Slices/DishSlice";
import DishCard from "../components/Cards/DishesCard";
import { useParams } from "react-router-dom";
import { useRequestCall } from "../hook";
import { CircularProgress } from "@mui/material";
// import { setLoading, removeLoading } from "../Slices/UserSlice";
import { useState } from "react";
import AddDish from "../components/Modals/AddDish";
import { ROLE } from "../constraint";
import dishesPic from "../assets/dishes_Page.jpeg"

const DishesPage = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.items);
  const user = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.user.loading); // Get loading state from Redux
  const [counter, setCounter] = useState({});
  const [fetchDish] = useRequestCall("get");
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log("user",user);
  
  const {counterId} = useParams();

  function fetchAllDishes(){
    fetchDish("http://localhost:3000/dish")
    .then(response => {
      // console.log(response);
      dispatch(setDish(response.data.dishes));
    })
  }

  function fetchDishByCounterId(counterId){
    fetchDish(`${VITE_BACKEND_URL}/counter/${counterId}`)
    .then(response => {
      // console.log(response);
      setCounter(response.data.counter)
    })
    fetchDish(`${VITE_BACKEND_URL}/dish/counter/${counterId}?role=${user.role}`,{
      counterId: counterId
    })
    .then(response => {
      // console.log(response);
      dispatch(setDish(response.data.counterDish));
    })
  }

  useEffect(() => {
    window.scrollTo(0,0);
    if(counterId){
      fetchDishByCounterId(counterId);
    }else{
      fetchAllDishes();
    }
      return () => {
        dispatch(setDish([]));
        setCounter({});
      }

  }, [counterId]);

// console.log(counter.name);

  return (
    <div className="min-h-[80vh] bg-gray-100">
    
    <img src={dishesPic} alt="" className="h-[50vh] w-full object-cover opacity-70"/>
    {/* Conditionally render the AddDish component */}
    {isAddDishOpen && <AddDish onClose={() => setIsAddDishOpen(false)} counterId={counterId} />}

    {loading ? (
      <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
        <CircularProgress />
      </div>
    ) : (
      <div>
      
      <div className="my-[2%] flex flex-col text-center bg-gray-100 space-y-2">
        <div className="text-center text-5xl font-bold text-blue-950">
        {counterId ? counter.name : "Flavours"} <span className="text-green-500">{counterId ? "Dishes Menu" : "you love,"}</span> {counterId ? "" : "One Destination!!"}
        </div>
        <div className="text-center text-lg text-gray-600">
        Enjoy a delightful variety of dishes from top restaurants, crafted to satisfy every craving. 
        </div>
        <div className="w-full flex justify-end pr-12">
          {counterId && user && user.role === ROLE.Merchant && <button
          onClick={() => setIsAddDishOpen(true)}
          className="bg-green-600 w-40 py-3 px-2 text-xl text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Dish
        </button>}

        </div>
      </div>
        <DishCard dishes={dishes} counterId={counterId} />
      </div>
    )}
  </div>
  );
};

export default DishesPage;
