import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">My App</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/profile" className="text-white hover:underline">
            Profile
          </Link>
          <Link to="/cart" className="text-white hover:underline">
            Cart
          </Link>
          <Link to="/dish" className="text-white hover:underline">
            Dish
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

