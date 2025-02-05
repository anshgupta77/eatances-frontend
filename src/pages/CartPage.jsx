import { useSelector } from "react-redux";
import { useEffect } from "react";
import CartCard from "../components/Cards/CartCard";
const CartPage = () => {
    const cartItems = useSelector(state =>state.cart.items);
    console.log(cartItems);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return ( 
        <div className="min-h-[80vh]">
            <CartCard cartItems={cartItems} />
        </div>
     );
}
 
export default CartPage;
