import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import emailjs from "@emailjs/browser";

const Payments = () => {
  const { products, cartItems } = useGlobalContext();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const states = ['Select State', 'Karnataka', 'Gujarat', 'Maharashtra','Telangana']; // Replace with actual states

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find((product) => product.id === Number(itemId));
        totalAmount += cartItems[itemId] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const totalAmount = getTotalCartAmount();

const handlePayment = async (e) => {
  e.preventDefault();
  
  // Send an email using EmailJS
  try {
    await emailjs.send('service_0uqdqle', 'template_ptnbzng', {
      to_email: email, 
      products: products
        .filter(product => cartItems[product.id] > 0)
        .map(product => `${product.title} (Quantity: ${cartItems[product.id]})`)
        .join(', '),
      totalAmount: totalAmount.toFixed(2),
    },'RryGNRclgd4btszQm');

    alert('Thank you for your purchase! An email has been sent with your order details.');
    setFullName('');
    setEmail('');
    setMobileNumber('');
    setPincode('');
    setAddress('');
    setCity('');
    setState('Select State');
    navigate("/");
    console.log('Payment successful!');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('An error occurred while processing your purchase. Please try again later.');
  }
};


  return (
    <div className="payments-container">
      <div className="payments-left">
        <h2>Order Summary</h2>
        <ul className="order-summary-list">
          {products.map((product) => {
            const quantity = cartItems[product.id];
            if (quantity > 0) {
              return (
                <li key={product.id} className="order-summary-item">
                  <p>{product.title}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Total Amount: ${(quantity * product.price).toFixed(2)}</p>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      </div>
      <div className="payments-right">
        <h2>Payment Details</h2>
        <form className="payment-form" onSubmit = {handlePayment}>
          <div className="address-form">
            <div><label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            /></div>
            <div><label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /></div>
            <div><label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            /></div>
            <div><label htmlFor="zipcode">ZIP code:</label>
            <input
              type="text"
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            /></div>
            <div><label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            /></div>
            <div><label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            /></div>
            <div><label htmlFor="state">State:</label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {states.map((stateOption, index) => (
                <option key={index} value={stateOption}>
                  {stateOption}
                </option>
              ))}
            </select></div>
          </div>
          <button className="payment-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments;
