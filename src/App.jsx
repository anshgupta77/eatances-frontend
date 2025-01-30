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
      // console.log("Fetch detail in the app.js",response.data.user);
      // dispatch(setCart(response.data.user.cart));
      // const user = response.data.user;
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
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={Layout(<HomePage />)} />
          <Route path="/counter" element={Layout(<CounterPage />)} />
          <Route path="/cart" element={Layout(<CartPage />)} />
          <Route path="/profile" element={Layout(<ProfilePage />)} />
          <Route path="/dish/counter/:id" element={Layout(<DishPage />)} />
          <Route path="/user" element={Layout(<UserPage />)} />
          <Route path="/managecounter" element={Layout(<ManageCounter />)} />
          <Route path="/loginsignup" element={<AuthPage />} />
        </Routes>
        <Connect/>
      </Router>
    </div>
  )
}

export default App
