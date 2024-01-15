import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const PrivateRoute = ({ Component }) => {
  const auth = useContext(AuthContext);
  return auth.token ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;