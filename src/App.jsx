import './App.css'
// import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import DishPage from './pages/DishesPage';
import NavBar from './components/Navbar';
import CounterPage from './pages/CounterPage';
import Connect from './components/Connect';
import AuthPage from './pages/LoginSignup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCart} from './Slices/CartSlice';
import { useRequestCall } from './hook';
import UserPage from './pages/UserPage';
import ManageCounter from './pages/ManageCounter';
import { setCurrentUser } from './Slices/AuthSlice';
import AdminPage from './pages/AdminPage';
import MerchantPage from './pages/MerchantPage';
import Auth from './Auth';
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from '@mui/material';

import { ROLE } from './constraint';
import { useSelector } from 'react-redux';
// import { removeLoading, setLoading } from './Slices/UserSlice';

function App() { 
  const dispatch = useDispatch();
  const [CallingRequest] = useRequestCall("get");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(VITE_BACKEND_URL);
  const [loading, setLoading] = useState(true);
  function Layout(component){
    return (
      <>
        <NavBar />
        {component}
      </>
    )
  }

  // useEffect(() =>{
  //   dispatch(setLoading());
  //   CallingRequest(`${VITE_BACKEND_URL}/user/userinfo`)
  //   .then(response =>{
  //     console.log(response.data.user);
  //     dispatch(setCurrentUser(response.data.user));
  //   }).catch (error=> {
  //     console.log(error);
  //   }).finally(() =>{
  //     dispatch(removeLoading()); 
  //   })
  // },[])

  // useEffect(()=>{
  //   dispatch(setLoading());
  //   CallingRequest(`${VITE_BACKEND_URL}/cart`)
  //   .then(response =>{
  //     console.log(response?.data?.cart || []);
  //     dispatch(setCart(response.data.cart));
  //   }).catch(error =>{
  //     console.log(error);
  //   })
  //   .finally(() =>{
  //     dispatch(removeLoading());
  //   })
  // }, [])

  useEffect(() => {
    const fetchUserInfo = CallingRequest(`${VITE_BACKEND_URL}/user/userinfo`);
    const fetchCart = CallingRequest(`${VITE_BACKEND_URL}/cart`);
    setLoading(true)
    Promise.all([fetchUserInfo, fetchCart])
      .then(([userResponse, cartResponse]) => {
        console.log(userResponse?.data?.user);
        dispatch(setCurrentUser(userResponse?.data?.user || {}));
  
        console.log(cartResponse?.data?.cart || []);
        dispatch(setCart(cartResponse?.data?.cart || []));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {  
        setLoading(false);
      });

      return () => {
        dispatch(setCart([]));
        dispatch(setCurrentUser(null));
      }
  }, []);
//   {loading && (
//     <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
//         <CircularProgress />
//     </div>
// )}
  if(loading){
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-50">
        <CircularProgress />
      </div>
    )
  }
  return (
    <div className="App ">
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes className="min-h-screen" >
            <Route path="/" element={Layout(<HomePage />)} />
            <Route path="/profile" element={Layout(<ProfilePage />)} />
            <Route path="/counter" element={Layout(<CounterPage />)} />
            <Route path="/dish" element={Layout(<DishPage />)}></Route>
            <Route path="/dish/counter/:counterId" element={Layout(<DishPage />)} />
            <Route element={<Auth />} >
                <Route path="/cart" element={Layout(<CartPage />)} />
                <Route path="/admin" element={Layout(<AdminPage />)} />
                <Route path="/merchant" element={Layout(<MerchantPage />)} />
                <Route path="/user" element={Layout(<UserPage />)} />
                <Route path="/managecounter" element={Layout(<ManageCounter />)} />
            </Route>
            <Route path="/loginsignup" element={<AuthPage />} />
          </Routes>
          <Connect/>
        </Router>
    </div>
  )
}

export default App


export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",  
    className: "bg-green-500 text-white border-2 border-green-700",
    bodyClassName: "text-white font-semibold",
  });
};


export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: "bg-red-500 text-red border-2 border-red-700", 
    bodyClassName: "text-red font-semibold",
  });
};
