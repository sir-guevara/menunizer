import {Route, Routes } from 'react-router-dom';

import Login from "../pages/Login";
import { ToastContainer } from 'react-toastify';
import Places from '../pages/Places';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import IndexPage from '../pages/IndexPage';
import Place from '../pages/Place';
import MenuSettings from '../pages/MenuSettings';
import Menu from '../pages/Menu';
import Orders from '../pages/Orders';


function App(){ 
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/places" element={<PrivateRoute Component={Places}/>} />
                <Route path="/places/:id" element={<PrivateRoute Component={Place}/>} />
                <Route path="/places/:id/settings" element={<PrivateRoute Component={MenuSettings}/>} />
                <Route path="/places/:id/orders/" element={<PrivateRoute Component={Orders} />} />
                <Route path="/menu/:id/:tableNumber" element={<Menu />} />
            </Routes>
            <ToastContainer />
        </AuthProvider>
    )
}
export default App
