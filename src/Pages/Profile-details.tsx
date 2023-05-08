import '../Style/Profile.css';
import { useProfile } from '../Context/ProfileContext';
import { useNavigate } from "react-router-dom";
import { useTodos } from '../Context/TodoContext';

const Profile = () => {
  const navigate = useNavigate();
  const {users} = useProfile();
  const email = localStorage.getItem('email');
  const profileData = users.filter((user) => user.otherData.email === email);
  const {setTodos} = useTodos();

  const handleLogout = () => {
     navigate('/login');
     localStorage.removeItem('email');
     localStorage.removeItem('isLoggedIn');
     setTodos([]);
  }

  return (
    <div className="profile-container">
      <img src={profileData[0].image} alt="Profile" className="profile-image" />
      <div className="profile-info">
        <h2 className="profile-name">User Name: {profileData[0].username}</h2>
        <div className="profile-details">
          <div className="profile-detail">
            <i className="fas fa-envelope"></i>
            <p className="profile-email">Email: {profileData[0].otherData.email}</p>
          </div>
          <div className="profile-detail">
            <i className="fas fa-phone"></i>
            <p className="profile-phone">Contact Number: {profileData[0].mobile}</p>
          </div>
        </div>
        <p className="profile-bio">Age: {profileData[0].otherData.age}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
