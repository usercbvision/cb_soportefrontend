// // // src/components/ProtectedRoute.jsx
// // import React from 'react';
// // import { Navigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// //
// // const ProtectedRoute = ({ children, allowedRoles = [] }) => {
// //     const { user } = useAuth();
// //
// //     if (!user) {
// //         return <Navigate to="/login" />;
// //     }
// //
// //     if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
// //         return <Navigate to="/" />;
// //     }
// //
// //     return children;
// // };
// //
// // export default ProtectedRoute;
//
//
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
//
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//     const location = useLocation();
//
//     // Obtener datos de autenticación directamente del localStorage
//     const getUserData = () => {
//         try {
//             const userData = localStorage.getItem('usersoporte');
//             return userData ? JSON.parse(userData) : null;
//         } catch (error) {
//             console.error('Error parsing user data:', error);
//             return null;
//         }
//     };
//
//     const getToken = () => {
//         return localStorage.getItem('token');
//     };
//
//     const user = getUserData();
//     const token = getToken();
//
//     // Si no hay usuario o token, redirigir al login
//     if (!user || !token) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }
//
//     // Si hay roles permitidos y el usuario no tiene el rol adecuado
//     if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//         return <Navigate to="/home" replace />;
//     }
//
//     // Si todo está bien, renderizar el componente hijo
//     return children;
// };
//
// export default ProtectedRoute;



import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ALLOWED_ROLES = [1, 2, 3, 7];

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    const validateSession = () => {
        try {
            const usersoporte = JSON.parse(localStorage.getItem('usersoporte'));
            const token = localStorage.getItem('token');

            if (!usersoporte || !token) {
                return {
                    isValid: false,
                    message: 'No hay sesión activa'
                };
            }

            if (!usersoporte.roles || !Array.isArray(usersoporte.roles)) {
                return {
                    isValid: false,
                    message: 'Usuario sin roles asignados'
                };
            }

            const hasValidRole = usersoporte.roles.some(role =>
                ALLOWED_ROLES.includes(role.id)
            );

            if (!hasValidRole) {
                return {
                    isValid: false,
                    message: 'No tienes permisos para acceder a esta sección'
                };
            }

            return { isValid: true };
        } catch (error) {
            console.error('Error validating session:', error);
            return {
                isValid: false,
                message: 'Error al validar la sesión'
            };
        }
    };

    const { isValid, message } = validateSession();

    if (!isValid) {
        // Limpiar localStorage antes de redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('usersoporte');
        localStorage.removeItem('selectedSucursal');

        return <Navigate
            to="/login"
            state={{ message, from: location.pathname }}
            replace
        />;
    }

    return children;
};

export default ProtectedRoute;