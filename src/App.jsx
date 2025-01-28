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
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCart} from './Slices/CartSlice';
import { useRequestCall } from './hook';


function App() { 
  const dispatch = useDispatch();
  const [loading, fetchCart] = useRequestCall("get");

  
  // useEffect(()=>{
  //   dispatch(setLoading());
  //   axios.get("http://localhost:3000/cart")
  //   .then(response =>{
  //     console.log(response?.data?.cart || []);
  //     dispatch(setCart(response.data.cart));
  //   }).catch(error =>{
  //     console.log(error);
  //   }).finally(()=>{
  //     dispatch(removeLoading());
  //   })
  // }, [])

  useEffect(()=>{
    // dispatch(setLoading());
    fetchCart("http://localhost:3000/cart")
    .then(response =>{
      console.log(response?.data?.cart || []);
      dispatch(setCart(response.data.cart));
    }).catch(error =>{
      console.log(error);
    })
  }, [])
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dish/counter/:id" element={<DishPage />} />
        </Routes>
        <Connect/>
      </Router>
    </div>
  )
}

export default App
