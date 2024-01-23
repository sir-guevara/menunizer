import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { AuthContextType } from "../types";

const PrivateRoute = ({ Component }) => {
  const auth = useContext(AuthContext) as AuthContextType;
  return auth.token ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;