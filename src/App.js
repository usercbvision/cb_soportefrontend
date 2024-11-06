// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Box, CssBaseline } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
//
// // Components
// import Navbar from './components/layout/Navbar';
// import Sidebar from './components/layout/Sidebar';
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
//
// // Pages
// import Login from './pages/Login';
// import Dashboard from './components/Dashboard';
// import Orders from './pages/Orders';
// import Technicians from './pages/Technicians';
// import TechScheduler from './pages/TechScheduler';
//
// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#1976d2',
//         },
//         secondary: {
//             main: '#dc004e',
//         },
//     },
// });
//
// const MainLayout = () => {
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [isMinimized, setIsMinimized] = useState(false);
//     const drawerWidth = 240;
//
//     const handleDrawerToggle = () => {
//         if (window.innerWidth >= 500) {
//             setIsMinimized(!isMinimized);
//         } else {
//             setMobileOpen(!mobileOpen);
//         }
//     };
//
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <Navbar handleDrawerToggle={handleDrawerToggle} />
//             <Sidebar
//                 mobileOpen={mobileOpen}
//                 isMinimized={isMinimized}
//                 handleDrawerToggle={handleDrawerToggle}
//                 drawerWidth={drawerWidth}
//             />
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     p: 3,
//                     width: { sm: `calc(100% - ${isMinimized ? 65 : drawerWidth}px)` },
//                     transition: theme => theme.transitions.create(['width', 'margin'], {
//                         easing: theme.transitions.easing.sharp,
//                         duration: theme.transitions.duration.enteringScreen,
//                     }),
//                 }}
//             >
//                 <Box sx={{ minHeight: '64px', minWidth: '165px' }} />
//                 <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route
//                         path="/orders"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin', 'agendamiento', 'supervisor', 'jefe_tecnico']}>
//                                 <Orders />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/technicians"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin', 'agendamiento', 'supervisor']}>
//                                 <Technicians />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/techscheduler"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin', 'agendamiento', 'jefe_tecnico']}>
//                                 <TechScheduler />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//             </Box>
//         </Box>
//     );
// };
//
// function App() {
//     return (
//         <ThemeProvider theme={theme}>
//             <BrowserRouter>
//                 <AuthProvider>
//                     <Routes>
//                         <Route path="/login" element={<Login />} />
//                         <Route
//                             path="/*"
//                             element={
//                                 <ProtectedRoute>
//                                     <MainLayout />
//                                 </ProtectedRoute>
//                             }
//                         />
//                     </Routes>
//                 </AuthProvider>
//             </BrowserRouter>
//         </ThemeProvider>
//     );
// }
//
// export default App;


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
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const theme = darkMode ? darkTheme : lightTheme;

    const handleToggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    return (
        <ThemeProvider theme={theme}>
            {/*<NotificationProvider>*/}
                <Router>
                    <CssBaseline />
                    <Routes>
                        <Route path="/login" element={
                            isAuthenticated() ? <Navigate to="/home" replace /> : <Login darkMode={darkMode} onToggleTheme={handleToggleTheme} />
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