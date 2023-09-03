import React from 'react';

var today = new Date();

const Footer = () => {
  return (
    <footer className="footer">
      <div className = 'footer-legal-info'>
      <div className="footer-section">
        <h3>Legal Information</h3>
        <ul>
          <li><a href="/terms">Terms of Use</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/cookies">Cookies Policy</a></li>
        </ul>
      </div>
      </div>
      <div className="footer-connect">
      <div className="footer-section">
        <h3>Connect with Us</h3>
        <ul>
          <li><a href="https://facebook.com">Facebook</a></li>
          <li><a href="https://twitter.com">Twitter</a></li>
          <li><a href="https://instagram.com">Instagram</a></li>
          <li><a href="/newsletter">Newsletter Signup</a></li>
        </ul>
      </div>
      </div>
      <div className = 'footer-company-info'>
      <div className="footer-section">
        <h3>Company Information</h3>
        <ul>
          <li><a href="/about">Our Story</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/testimonials">Testimonials</a></li>
          <li><a href="/press">Press</a></li>
        </ul>
      </div>
      </div>
      <div className="footer-copyright">
        &copy; {today.getFullYear()} BuyBest, Inc. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
