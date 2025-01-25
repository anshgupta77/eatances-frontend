import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDish } from "./../Slices/DishSlice";
import DishCard from "../components/DishesCard";
import { useParams } from "react-router-dom";
const DishesPage = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.items);
  const {id} = useParams();

  useEffect(() => {
    axios(`http://localhost:3000/dish/counter/${id}`) // Replace with your actual API endpoint
      .then((response) => {
        console.log(response);
        dispatch(setDish(response.data.counterDish));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <div className="p-6">
        <DishCard dishes={dishes} />
    </div>
  );
};

export default DishesPage;
