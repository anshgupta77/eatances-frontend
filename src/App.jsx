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
import { useEffect } from 'react';
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

function App() { 
  const dispatch = useDispatch();
  const [CallingRequest] = useRequestCall("get");

  


  function Layout(component){
    return (
      <>
        <NavBar />
        {component}
      </>
    )
  }

  useEffect(() =>{
    CallingRequest("http://localhost:3000/user/userinfo")
    .then(response =>{
      console.log(response.data.user);
      dispatch(setCurrentUser(response.data.user));
    }).catch (error=> {
      console.log(error);
    })
  },[])

  useEffect(()=>{
    // dispatch(setLoading());
    CallingRequest("http://localhost:3000/cart")
    .then(response =>{
      console.log(response?.data?.cart || []);
      dispatch(setCart(response.data.cart));
    }).catch(error =>{
      console.log(error);
    })
  }, [])
  return (
    <div className="App ">
      <Router>
        {/* <Navbar /> */}
        {/* <NavBar /> */}
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes className="min-h-screen bg-gray-100" >
          <Route path="/" element={Layout(<HomePage />)} />
          <Route path="/profile" element={Layout(<ProfilePage />)} />
          <Route path="/counter" element={Layout(<CounterPage />)} />
          <Route path="/dish/counter/:counterId" element={Layout(<DishPage />)} />
          <Route path="/dish" element={Layout(<DishPage />)}></Route>
          <Route element={<Auth />} >
            <Route path="/cart" element={Layout(<CartPage />)} />
            <Route path="/admin" element={Layout(<AdminPage />)}></Route>
            <Route path="/merchant" element={Layout(<MerchantPage />)}></Route>
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
