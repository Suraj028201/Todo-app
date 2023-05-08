import { Navigate } from 'react-router-dom';
import { useProfile } from '../Context/ProfileContext';
import Dashboard from '../Pages/Dashboard';

const PrivateRoute = () => {

  const {isLoggedIn} = useProfile()
  const localLog = localStorage.getItem('isLoggedIn');

  return isLoggedIn || localLog ? (
    <Dashboard/>
  ) : (
    <Navigate to='/' replace />
  )
}

export default PrivateRoute