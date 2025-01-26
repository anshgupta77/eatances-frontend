import cartImage from "./../assets/cart.png";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
const NewNavbar = () => {
  return (
    <div className=" shadow-md sticky top-0 z-50 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6 w-[90vw] mx-auto">
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
        
        <div className="flex space-x-6 text-blue-950 font-serif font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="relative hover:text-green-600 cursor-pointer group">
            <Link to="/">
            Home
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
        </div>
        <div className="relative hover:text-green-600 cursor-pointer group">
            <Link to="/profile" >
            Profile
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
        </div>
        <div className="relative hover:text-green-600 cursor-pointer group">
            <Link to="/cart" >
            Cart
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
        </div>
        <div className="relative hover:text-green-600 cursor-pointer group">
            <Link to="/dish" >
            Dish
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
        </div>
        <div className="relative hover:text-green-600 cursor-pointer group">
                        About us
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
        </div>
        <div className="relative hover:text-green-600 cursor-pointer group">
                        Contact us
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
        </div>
    </div>


        {/* Cart and Login */}
        <div className="flex items-center space-x-4">
          {/* { <ShoppingCart className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-600" /> } */}

          <div className="relative">
            {/* Item Count */}
            <div className="absolute top-0 right-0 text-orange-400 text-s font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
            0
            </div>
            {/* Shopping Cart Icon */}
            <ShoppingCart className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-600" />
        </div>
            <button className="flex items-center justify-center space-x-2 px-8 py-3 text-green-600 text-lg bg-gray-200 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300">
            <i className="fi-rr-user text-green-600 text-xl"></i>
            <span>Login</span>
            </button>

        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
