import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDish } from "./../Slices/DishSlice";
import DishCard from "../components/Cards/DishesCard";
import { useParams } from "react-router-dom";
import { useRequestCall } from "../hook";
import { CircularProgress } from "@mui/material";
import { setLoading, removeLoading } from "../Slices/UserSlice";
import { useState } from "react";
import AddDish from "../components/Modals/AddDish";

const DishesPage = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.items);
  const loading = useSelector((state) => state.user.loading); // Get loading state from Redux
  const [counter, setCounter] = useState({});
  const [fetchDish] = useRequestCall("get");
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  
  
  const {id} = useParams();


  useEffect(() => {
    window.scrollTo(0,0);
    fetchDish(`http://localhost:3000/counter/${id}`)
    .then(response => {
      // console.log(response);
      setCounter(response.data.counter)
    })
    fetchDish(`http://localhost:3000/dish/counter/${id}`) // Replace with your actual API endpoint
      .then((response) => {
        // console.log(response);
        dispatch(setDish(response?.data?.counterDish || []));
      })

      return () => {
        dispatch(setDish([]));
        setCounter({});
      }

  }, []);



  return (
    <div className="p-6 min-h-[80vh] bg-gray-100">
    

    {/* Conditionally render the AddDish component */}
    {isAddDishOpen && <AddDish onClose={() => setIsAddDishOpen(false)} />}

    {loading ? (
      <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
        <CircularProgress />
      </div>
    ) : (
      <div>
        <div className="flex justify-between items-center mb-8">
      <button
        onClick={() => setIsAddDishOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Dish
      </button>
      <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
        {counter.name}'s Dishes Menu
      </h1>
    </div>
        <DishCard dishes={dishes} />
      </div>
    )}
  </div>
  );
};

export default DishesPage;
