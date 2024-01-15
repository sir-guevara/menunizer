import {Route, Routes } from 'react-router-dom';

import Login from "../pages/Login";
import { ToastContainer } from 'react-toastify';
import Places from '../pages/Places';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import IndexPage from '../pages/IndexPage';


function App(){ 
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/places" element={<PrivateRoute Component={Places}/>} />
                
            </Routes>
            <ToastContainer />
        </AuthProvider>
    )
}
export default App
