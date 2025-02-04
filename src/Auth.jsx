import { useSelector } from "react-redux";
import { notifyError } from "./App";
import  {Outlet, Navigate, useLocation}  from "react-router-dom";
import React from "react";
const Auth = () => {
    const user = useSelector(state => state.auth.currentUser);
    const token = localStorage.getItem("token")
    console.log(user);
    const location = useLocation();
    return ( 
        token? <Outlet></Outlet> : <Navigate to="loginsignup" state={{from : location.pathname}}></Navigate>
     );
}
 
export default Auth;

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = useSelector(state => state.auth.currentUser);
    const [notified, setNotified] = React.useState(false);
  
    if (!user || !allowedRoles.includes(user.role)) {
      if (!notified) {
        notifyError("You do not have permission to access this page");
        setNotified(true); // ✅ Prevent multiple toasts
      }
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  


