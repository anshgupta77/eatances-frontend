import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDish } from "./../Slices/DishSlice";
import DishCard from "../components/DishesCard";
import { useParams } from "react-router-dom";
import { useRequestCall } from "../hook";
import { CircularProgress } from "@mui/material";
import { setLoading, removeLoading } from "../Slices/AuthSlice";

const DishesPage = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.items);
  const loading = useSelector((state) => state.auth.loading); // Get loading state from Redux

  // const [loading, fetchDish] = useRequestCall("get");
  console.log(dishes);
  const {id} = useParams();

  // useEffect(() => {
  //   axios(`http://localhost:3000/dish/counter/${id}`) // Replace with your actual API endpoint
  //     .then((response) => {
  //       console.log(response);
  //       dispatch(setDish(response?.data?.counterDish || []));
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    dispatch(setLoading());
    axios.get(`http://localhost:3000/dish/counter/${id}`) // Replace with your actual API endpoint
      .then((response) => {
        console.log(response);
        dispatch(setDish(response?.data?.counterDish || []));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(removeLoading());
      });
  }, []);



  return (
    <div className="p-6 min-h-[80vh]">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
            <CircularProgress />
        </div>
      )}
        <DishCard dishes={dishes}/>
    </div>
  );
};

export default DishesPage;
