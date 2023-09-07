// Navbar.js
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';
import { auth } from "../firebase";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the location changes
  }, [location]);

  const { setSearchTerm, currentUser } = useGlobalContext(); // Use the setSearchTerm from the context

  const clearSearchTerm = () => {
    setSearchTerm(""); // Clear the searchTerm
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BuyBest
        </Link>
        <div className="navbar-nav-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={clearSearchTerm}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/categories"
                onClick={clearSearchTerm}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-cart" to="/cart">
                <AiOutlineShoppingCart />
              </Link>
            </li>
            <li className="nav-item contact">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link className='nav-link' to='/login'>
                Login
              </Link>
              /
              <Link className='nav-link' to='/register'>
                Register
              </Link> */}
              {currentUser ? (
                <>
                <Link to="/profile" className="nav-link nav-profile"><CgProfile /></Link>
                  <button onClick={handleLogout} className="nav-logout">Logout <BiLogOut /></button>
                </>
              ) : (
                <>
                  <Link className='nav-link' to="/login">Login</Link>  /
                  <Link className='nav-link' to="/register">Register</Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
