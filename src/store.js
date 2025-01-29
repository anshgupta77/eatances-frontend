import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/CounterSlice";
import dishReducer from "./Slices/DishSlice";
import cartReducer from "./Slices/CartSlice";
import userReducer from "./Slices/UserSlice";
import authReducer from "./Slices/AuthSlice";
export default configureStore({
    reducer: {
        counter: counterReducer,
        dish: dishReducer,
        cart: cartReducer,
        user: userReducer,
        auth: authReducer,
    },
});