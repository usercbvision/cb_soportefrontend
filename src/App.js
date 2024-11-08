


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import { NotificationProvider } from './NotificacionContext';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { lightTheme, darkTheme } from './theme';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = sessionStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        sessionStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const theme = darkMode ? darkTheme : lightTheme;

    const handleToggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const isAuthenticated = () => {
        return !!sessionStorage.getItem('token');
    };

    return (
        <ThemeProvider theme={theme}>
            {/*<NotificationProvider>*/}
                <Router basename="/soporte">
                    <CssBaseline />
                    <Routes>
                        <Route path="/login" element={
                            isAuthenticated() ? <Navigate to="/technicians" replace /> : <Login darkMode={darkMode} onToggleTheme={handleToggleTheme} />
                        } />
                        <Route path="/*" element={
                            <ProtectedRoute>
                                <Dashboard darkMode={darkMode} onToggleTheme={handleToggleTheme} />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Router>
            {/*</NotificationProvider>*/}
        </ThemeProvider>
    );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import Login from './pages/Login';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import { lightTheme, darkTheme } from './theme';
//
// function App() {
//     const [darkMode, setDarkMode] = useState(() => {
//         const savedMode = sessionStorage.getItem('darkMode');
//         return savedMode === 'true';
//     });
//
//     useEffect(() => {
//         sessionStorage.setItem('darkMode', darkMode);
//     }, [darkMode]);
//
//     const theme = darkMode ? darkTheme : lightTheme;
//
//     const handleToggleTheme = () => {
//         setDarkMode(prevMode => !prevMode);
//     };
//
//     const isAuthenticated = () => {
//         const token = sessionStorage.getItem('token');
//         const usersoporte = sessionStorage.getItem('usersoporte');
//         return !!(token && usersoporte);
//     };
//
//     return (
//         <ThemeProvider theme={theme}>
//             <Router basename="/soporte">
//                 <CssBaseline />
//                 <Routes>
//                     {/* Ruta raíz que redirige a /technicians */}
//                     <Route path="/" element={
//                         isAuthenticated() ?
//                             <Navigate to="/technicians" replace /> :
//                             <Navigate to="/login" replace />
//                     } />
//
//                     {/* Ruta de login */}
//                     <Route path="/login" element={
//                         isAuthenticated() ?
//                             <Navigate to="/technicians" replace /> :
//                             <Login darkMode={darkMode} onToggleTheme={handleToggleTheme} />
//                     } />
//
//                     {/* Rutas protegidas */}
//                     <Route path="/technicians/*" element={
//                         <ProtectedRoute>
//                             <Dashboard darkMode={darkMode} onToggleTheme={handleToggleTheme} />
//                         </ProtectedRoute>
//                     } />
//
//                     {/* Cualquier otra ruta redirige a /technicians */}
//                     <Route path="*" element={
//                         <Navigate to="/technicians" replace />
//                     } />
//                 </Routes>
//             </Router>
//         </ThemeProvider>
//     );
// }
//
// export default App;