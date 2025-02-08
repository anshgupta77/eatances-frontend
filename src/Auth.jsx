import { useSelector } from "react-redux";
import { notifyError } from "./App";
import  {Outlet, Navigate, useLocation}  from "react-router-dom";
import React from "react";
const Auth = () => {
    const user = useSelector(state => state.auth.currentUser);
    const loading = useSelector(state =>state.user.loading);
    const token = localStorage.getItem("token")
    console.log("User from the auth",user);
    const location = useLocation();
    return ( 
        token ? <Outlet /> : <Navigate to="loginsignup" state={{from : location.pathname}} replace></Navigate>
     );
}
export default Auth;
  


