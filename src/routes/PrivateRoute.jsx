// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogined } from '../guard/guard';
const PrivateRoute = ({ children }) => {
    console.log(children);
    if(isLogined()) return children;
    return <Navigate to="/login" replace></Navigate>;
};


export default PrivateRoute;
