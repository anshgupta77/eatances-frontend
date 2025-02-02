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
      dispatch(setCurrentUser(response.data.user));
    }).catch (error=> {
      console.log(error);
    })
  },[])

  useEffect(()=>{
    // dispatch(setLoading());
    CallingRequest("http://localhost:3000/cart")
    .then(response =>{
      // console.log(response?.data?.cart || []);
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
        <Routes className="min-h-screen bg-gray-100" >
          <Route path="/" element={Layout(<HomePage />)} />
          <Route path="/counter" element={Layout(<CounterPage />)} />
          <Route path="/cart" element={Layout(<CartPage />)} />
          <Route path="/profile" element={Layout(<ProfilePage />)} />
          <Route path="/dish/counter/:id" element={Layout(<DishPage />)} />
          <Route path="/user" element={Layout(<UserPage />)} />
          <Route path="/managecounter" element={Layout(<ManageCounter />)} />
          <Route path="/loginsignup" element={<AuthPage />} />
          <Route path="/admin" element={Layout(<AdminPage />)}></Route>
          <Route path="/merchant" element={Layout(<MerchantPage />)}></Route>
        </Routes>
        <Connect/>
      </Router>
    </div>
  )
}

export default App
