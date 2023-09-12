import React, { useContext, useEffect, useState } from "react"
import axios from "axios";
import { auth } from "./firebase";


const AppContext = React.createContext()

const allProducts = 'https://fakestoreapi.com/products'




const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loadings, setLoadings] = useState(true);
  const [currentUser, setCurrentUser] = useState('');

  function signup(email, password) {
    const user = auth.createUserWithEmailAndPassword(email, password);
    return user;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const getDefaultCart = () => {
    let cart = {}
    for (let i = 1; i < 21; i++) {
      cart[i] = 0;
    }
    return cart;
  }

  // const getCartItemsFromLocalStorage = () => {
  //   let cartItem = localStorage.getItem('cartItems');
  //   if (cartItem != null) {
  //     cartItem = JSON.parse(localStorage.getItem('cartItems'))
  //   }
  //   else {
  //     cartItem = getDefaultCart()
  //   }
  //   return cartItem
  // }

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const fetchProducts = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios(url)
      if (data) {
        setProducts(data);
      }
      else {
        setProducts([])
      }
    }
    catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }

  const selectProduct = (id) => {
    let product;
    product = products.find((product) => product.id === id)
    setSelectedProduct(product)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }

  const updateCartItemCount = (newAmount, id) => {
    setCartItems((prev) => ({ ...prev, [id]: newAmount }))
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadings(false);
    });
    
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchProducts(allProducts)
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [cartItems])

  return (
    <AppContext.Provider value={{ loading, products, categoriesProducts, setCategoriesProducts, searchTerm, setSearchTerm, showModal, selectProduct, selectedProduct, closeModal, cartItems, setCartItems,addToCart, removeFromCart, updateCartItemCount,signup,currentUser,setCurrentUser, login,resetPassword }}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }