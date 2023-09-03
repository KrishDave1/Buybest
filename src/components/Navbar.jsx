// Navbar.js
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { AiOutlineShoppingCart } from 'react-icons/ai';


const Navbar = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the location changes
  }, [location]);

  const { setSearchTerm } = useGlobalContext(); // Use the setSearchTerm from the context

  const clearSearchTerm = () => {
    setSearchTerm(''); // Clear the searchTerm
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          BuyBest
        </Link>
        <div className='navbar-nav-center'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/' onClick={clearSearchTerm}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/categories' onClick={clearSearchTerm}>
                Categories
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link nav-cart' to='/cart'><AiOutlineShoppingCart /></Link>
            </li>
            <li className='nav-item contact'>
              <Link className='nav-link' to='/contact'>
                Contact Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
              /
              <Link className='nav-link' to='/register'>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
