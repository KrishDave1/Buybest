import React from 'react';
import { useGlobalContext } from '../context';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, cartItems } = useGlobalContext();

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payments');
  };
  
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Your Cart Items</h2>
      </div>
      <div className="cart-items">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={product.id} />;
          }
          return null;
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="cart-checkout">
          <h4 className="subtotal">Subtotal: ${totalAmount.toFixed(2)}</h4>
          <button className="continue-btn" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <h3 className="empty-cart-title">Your Cart is Empty</h3>
      )}
    </div>
  );
};

export default Cart;

