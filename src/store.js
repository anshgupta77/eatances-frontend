import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/CounterSlice";
import dishReducer from "./Slices/DishSlice";
export default configureStore({
    reducer: {
        counter: counterReducer,
        dish: dishReducer,
    },
});