// Profile.js
import React from 'react';

const Profile = () => {
  // Assuming you have a way to access user information
    const user = 'hello'// ... get user information from your authentication system
  
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
    </div>
    );
};

export default Profile;
