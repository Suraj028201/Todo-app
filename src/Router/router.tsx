import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../Pages/Login";
import PrivateRoute from './PrivateRoute';

const Router = () => (
    <BrowserRouter>
        <Routes>
        <Route path="/">
          <Route index element={<Navigate to="Login" />} />
          <Route path="login" element={<Login/>} />
          <Route path="dashboard" element={<PrivateRoute />} />
        </Route>
        <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    </BrowserRouter>
  );
  
  export default Router;
