import { useSelector } from "react-redux";
import  {Outlet, Navigate, useLocation}  from "react-router-dom";

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