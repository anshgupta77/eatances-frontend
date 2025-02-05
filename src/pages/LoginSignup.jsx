import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import AmazonIcon from "../assets/amazon_logo.png";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Slices/AuthSlice';
import {useRequestCall} from './../hook';
import { setCart } from '../Slices/CartSlice';
import axios from 'axios';


const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error,setError] = useState(null);
//   const [loading, userFetch] = useRetryCall("get");
  const [loginRegisterInfo] = useRequestCall("post");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  
  const location = useLocation();
  const path = location.state?.from || "/profile";
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if(isLoginView){
    axios.post(`${VITE_BACKEND_URL}/login`, { email: formData.email, password: formData.password })
        .then((response) => {
        
        const {token, refresh_token, user} = response?.data;
        console.log(token, refresh_token);
        localStorage.setItem("token", token);
        localStorage.setItem("refresh-token", refresh_token);
        // userFetch("http://localhost:4000/user/userinfo")
        dispatch(setCurrentUser(response.data.user));
        dispatch(setCart(response.data.user.cart));
        console.log("login cart",response.data.user.cart);
        // .then(response =>{
        //   console.log(response);
          navigate("/");
        
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response.data.message || "Something went wrong";
        setError(errorMessage);
    });
    }else{
    axios.post(`${VITE_BACKEND_URL}/register`, { username: formData.name, email: formData.email, password: formData.password , role: formData.role})
      .then((response) => {
        const email = formData.email;
        dispatch(setCurrentUser({email}));
        console.log(response);
        setIsLoginView((prev) => !prev);
        navigate('/loginsignup');

      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response.data.message || "Something went wrong";
        setError(errorMessage);
    });
    }
    
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <div className="flex space border-b bg-white border-gray-300 py-3">
      <Link to="/">
        <div 
            className="text-3xl font-bold text-blue-950 font-serif hover:text-green-500"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            >
            eatances
            <span 
                className="text-green-600 inline-flex align-baseline" 
                style={{ fontSize: '1.5rem', marginLeft: '0.1rem' }}
            >
                •
            </span>
        </div>
       </Link>
      </div>

      
      <div className="flex-grow flex justify-center px-4">
        <div className="w-full max-w-[350px] my-4">
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <h1 className="text-3xl font-normal mb-4">
              {isLoginView ? 'Sign-In' : 'Create account'}
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {!isLoginView && (
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 focus:outline-none"
                    placeholder="First and last name"
                  />
                </div>
              )}

              
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 focus:outline-none"
                />
              </div>

              
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 focus:outline-none"
                  placeholder={isLoginView ? '' : 'At least 6 characters'}
                />
                {!isLoginView && (
                  <p className="text-xs text-gray-600 mt-1">
                    Passwords must be at least 6 characters.
                  </p>
                )}
              </div>

              
              {!isLoginView && (
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Role</label>
                    <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 focus:outline-none"
                    >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                    <option value="merchant">Merchant</option>
                    </select>
                </div>
                )}


              
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 border border-green-500 rounded-lg py-1 px-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2"
              >
                {isLoginView ? 'Sign-In' : 'Create your Eatance account'}
              </button>
            </form>

            
            <p className="text-xs text-gray-600 mt-4">
              By continuing, you agree to Eatance's{' '}
              <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-orange-700 hover:underline">
                Privacy Notice
              </a>
              .
            </p>

            {isLoginView && (
              <div className="mt-4">
                <div className="text-xs text-gray-600">
                  <a href="#" className="hover:text-orange-700 hover:underline">
                    Need help?
                  </a>
                </div>
              </div>
            )}
          </div>

          
          <div className="relative mt-8 mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLoginView ? 'New to Eatance?' : 'Already have an account?'}
              </span>
            </div>
          </div>

          
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg py-1 px-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {isLoginView ? 'Create your Eatance account' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;