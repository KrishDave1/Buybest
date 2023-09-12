import { useGlobalContext } from '../context';

const Profile = () => {
  // Assuming you have a way to access user information
  const { currentUser } = useGlobalContext();
  
  return (
    <div>
      <h2>Welcome {currentUser}!</h2>
    </div>
    );
};

export default Profile;


