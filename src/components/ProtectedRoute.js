// // src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//     const { user } = useAuth();
//
//     if (!user) {
//         return <Navigate to="/login" />;
//     }
//
//     if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//         return <Navigate to="/" />;
//     }
//
//     return children;
// };
//
// export default ProtectedRoute;


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();

    // Obtener datos de autenticación directamente del localStorage
    const getUserData = () => {
        try {
            const userData = localStorage.getItem('user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const user = getUserData();
    const token = getToken();

    // Si no hay usuario o token, redirigir al login
    if (!user || !token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si hay roles permitidos y el usuario no tiene el rol adecuado
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/home" replace />;
    }

    // Si todo está bien, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;