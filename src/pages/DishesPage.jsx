import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDish } from "./../Slices/DishSlice";
import DishCard from "../components/Cards/DishesCard";
import { useParams } from "react-router-dom";
import { useRequestWithoutToken } from "../hook";
import { useRequestCall } from "../hook";
import { CircularProgress } from "@mui/material";
// import { setLoading, removeLoading } from "../Slices/UserSlice";
import { useState } from "react";
import AddDish from "../components/Modals/AddDish";
import { ROLE } from "../constraint";
import dishesPic from "../assets/dishes_Page1.jpeg"
import WeOffer from "../components/WeOffer";
import LoadingOverlay from "../components/LoadingOverlay";
import search_icon from "../assets/search.png"
const DishesPage = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.items);
  const user = useSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(false); // Get loading state from Redux
  const [counter, setCounter] = useState({});
  const [fetchDishWithoutToken] = useRequestWithoutToken("get");
  const [fetchDish2] = useRequestCall("get");
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [search, setSearch] = useState("");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isFocused, setIsFocused] = useState(false);
  console.log("search",search);
  
  const {counterId} = useParams();

  function fetchAllDishes(){
    fetchDishWithoutToken(`${VITE_BACKEND_URL}/dish?${search !== "" ? `search=${search}` : ""}`)
    .then(response => {
      // console.log(response);
      dispatch(setDish(response.data.dishes));
    }).catch(error => { 
      console.error("Error fetching dishes:", error);
    }).finally(() =>{
      setLoading(false);
    }); 
  }

  function fetchDishByCounterId(counterId){
    fetchDish2(`${VITE_BACKEND_URL}/counter/${counterId}`)
    .then(response => {
      // console.log(response);
      setCounter(response.data.counter)
    })
    fetchDish2(`${VITE_BACKEND_URL}/dish/counter/${counterId}?role=${user.role}`)
    .then(response => {
      console.log(response);
      dispatch(setDish(response.data.counterDish));
    }).catch(error => {
      console.error("Error fetching dishes:", error);
    }).finally(() =>{
      setLoading(false);
    });
  }

  useEffect(() => {
    window.scrollTo(0,0);
    setLoading(true);
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

  const handleSearch = () => {
    setLoading(true);
    fetchAllDishes();
  }

  

  return (
    <>
    <div className="min-h-[80vh] bg-gray-100">
      <div className="relative">
        <img src={dishesPic} alt="" className="h-[50vh] w-full object-cover brightness-75"/>
        
        {/* Hero Section with Search */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
            Discover Your Next Favorite Dish
          </h1>
                <div className="w-full flex justify-center">
                      <div className={`
                        w-full max-w-2xl 
                        bg-white 
                        rounded-full 
                        shadow-2xl
                        flex items-center 
                        px-3 py-2 
                        transform transition-all 
                        duration-300 
                        ease-in-out
                        ${isFocused ? 'ring-2 ring-green-500/50' : 'scale-100'}
                        mobile:max-w-[90%]
                        sm:max-w-md
                        md:max-w-2xl
                        lg:max-w-3xl
                      `}>
                        <img 
                          src={search_icon} 
                          alt="Search" 
                          className="w-5 h-5 sm:w-6 sm:h-6 opacity-60 mr-2"
                        />
                        <input
                          type="text"
                          placeholder="Search for dishes..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className="
                            flex-1 
                            outline-none 
                            text-base 
                            sm:text-lg 
                            text-gray-700 
                            placeholder-gray-400
                            transition-all 
                            duration-300
                            w-full
                          "
                        />
                        <button
                          onClick={handleSearch}
                          className="
                            bg-green-600 
                            hover:bg-green-700 
                            text-white 
                            px-2 
                            py-1 
                            sm:px-3 
                            sm:py-2 
                            rounded-full 
                            font-medium 
                            transition-colors 
                            duration-200 
                            my-1
                            text-sm 
                            sm:text-base
                          "
                        >
                          Search
                        </button>
                      </div>
                    </div>
        </div>
      </div>

      {isAddDishOpen && <AddDish onClose={() => setIsAddDishOpen(false)} counterId={counterId} setLoading={setLoading}/>}

      {loading ? (
        <LoadingOverlay />
      ) : (
        <div>
          <div className="my-[2%] flex flex-col text-center bg-gray-100 space-y-2">
            <div className="text-center text-5xl font-bold text-blue-950">
              {counterId ? counter.name : "Flavours"} <span className="text-[#228B22]">{counterId ? "Dishes Menu" : "you love,"}</span> {counterId ? "" : "One Destination!!"}
            </div>
            <div className="text-center text-lg text-gray-600">
              Enjoy a delightful variety of dishes from top restaurants, crafted to satisfy every craving. 
            </div>
            <div className="w-full flex justify-end pr-12">
              {counterId && user && user.role === ROLE.Merchant && 
                <button
                  onClick={() => setIsAddDishOpen(true)}
                  className="bg-[#0a830a] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add Dish
                </button>
              }
            </div>
          </div>
          <DishCard dishes={dishes} counterId={counterId} setLoading={setLoading}/>
        </div>
      )} 
    </div>
    <WeOffer/>
    </>
  );
};

export default DishesPage;
