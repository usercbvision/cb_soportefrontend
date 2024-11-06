// // import React, { useState, useEffect } from 'react';
// // import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// // import { Box, ThemeProvider, CssBaseline } from '@mui/material';
// // import { lightTheme, darkTheme } from '../theme';
// // import Navbar from './layout/Navbar';
// // import Sidebar from './layout/Sidebar';
// // import Orders from '../pages/Orders';
// // import Technicians from '../pages/Technicians';
// // import TechScheduler from '../pages/TechScheduler';
// // import ProtectedRoute from './ProtectedRoute';
// //
// // const drawerWidth = 240;
// // const miniDrawerWidth = 64;
// //
// // function Dashboard() {
// //     const [sidebarOpen, setSidebarOpen] = useState(false);
// //     const [darkMode, setDarkMode] = useState(() => {
// //         const savedMode = localStorage.getItem('darkMode');
// //         return savedMode === 'true';
// //     });
// //     const [isLoading, setIsLoading] = useState(false);
// //     const location = useLocation();
// //     const theme = darkMode ? darkTheme : lightTheme;
// //
// //     useEffect(() => {
// //         localStorage.setItem('darkMode', darkMode);
// //     }, [darkMode]);
// //
// //     useEffect(() => {
// //         // Simular carga inicial
// //         setIsLoading(true);
// //         setTimeout(() => {
// //             setIsLoading(false);
// //         }, 1000);
// //     }, []);
// //
// //     const handleDrawerToggle = () => {
// //         setSidebarOpen(!sidebarOpen);
// //     };
// //
// //     const handleThemeToggle = () => {
// //         setDarkMode(prevMode => !prevMode);
// //     };
// //
// //     return (
// //         <ThemeProvider theme={theme}>
// //             <CssBaseline />
// //             <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default }}>
// //                 <Navbar
// //                     onToggleSidebar={handleDrawerToggle}
// //                     onToggleTheme={handleThemeToggle}
// //                     darkMode={darkMode}
// //                     isOpen={sidebarOpen}
// //                     drawerWidth={drawerWidth}
// //                     theme={theme}
// //                 />
// //                 <Sidebar
// //                     open={sidebarOpen}
// //                     onDrawerToggle={handleDrawerToggle}
// //                     darkMode={darkMode}
// //                     drawerWidth={drawerWidth}
// //                 />
// //                 <Box
// //                     component="main"
// //                     sx={{
// //                         flexGrow: 1,
// //                         p: 4,
// //                         width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : miniDrawerWidth}px)` },
// //                         ml: { sm: `${sidebarOpen ? drawerWidth : miniDrawerWidth}px` },
// //                         transition: theme.transitions.create(['width', 'margin'], {
// //                             easing: theme.transitions.easing.sharp,
// //                             duration: theme.transitions.duration.leavingScreen,
// //                         }),
// //                         mt: `${theme.mixins.toolbar.minHeight + 8}px`,
// //                         minHeight: '100vh',
// //                     }}
// //                 >
// //                     <Box sx={{ pt: 2 }}>
// //                         <Routes>
// //                             {/* Ruta principal */}
// //                             <Route path="/" element={<Navigate to="/orders" replace />} />
// //
// //                             {/* Rutas protegidas */}
// //                             <Route
// //                                 path="/orders"
// //                                 element={
// //                                     <ProtectedRoute>
// //                                         <Orders />
// //                                     </ProtectedRoute>
// //                                 }
// //                             />
// //
// //                             <Route
// //                                 path="/technicians"
// //                                 element={
// //                                     <ProtectedRoute>
// //                                         <Technicians />
// //                                     </ProtectedRoute>
// //                                 }
// //                             />
// //
// //                             <Route
// //                                 path="/scheduler"
// //                                 element={
// //                                     <ProtectedRoute>
// //                                         <TechScheduler />
// //                                     </ProtectedRoute>
// //                                 }
// //                             />
// //
// //                             {/* Redirección por defecto */}
// //                             <Route path="*" element={<Navigate to="/orders" replace />} />
// //                         </Routes>
// //                     </Box>
// //                 </Box>
// //             </Box>
// //         </ThemeProvider>
// //     );
// // }
// //
// // export default Dashboard;
//
//
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { Box, ThemeProvider, CssBaseline } from '@mui/material';
// import { lightTheme, darkTheme } from '../theme';
// import Navbar from './layout/Navbar';
// import Sidebar from './layout/Sidebar';
// import Home from '../pages/Home';
// import Orders from '../pages/Orders';
// import Technicians from '../pages/Technicians';
// import TechScheduler from '../pages/TechScheduler';
//
// const drawerWidth = 240;
// const miniDrawerWidth = 64;
//
// function Dashboard() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [darkMode, setDarkMode] = useState(() => {
//         const savedMode = localStorage.getItem('darkMode');
//         return savedMode === 'true';
//     });
//     const location = useLocation();
//     const theme = darkMode ? darkTheme : lightTheme;
//
//     useEffect(() => {
//         localStorage.setItem('darkMode', darkMode);
//     }, [darkMode]);
//
//     useEffect(() => {
//         const user = localStorage.getItem('user');
//         if (!user && location.pathname !== '/login') {
//             window.location.href = '/login';
//         }
//     }, [location]);
//
//     const handleDrawerToggle = () => {
//         setSidebarOpen(!sidebarOpen);
//     };
//
//     const handleThemeToggle = () => {
//         setDarkMode(prevMode => !prevMode);
//     };
//
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default }}>
//                 <Navbar
//                     onToggleSidebar={handleDrawerToggle}
//                     onToggleTheme={handleThemeToggle}
//                     darkMode={darkMode}
//                     isOpen={sidebarOpen}
//                     drawerWidth={drawerWidth}
//                 />
//                 <Sidebar
//                     open={sidebarOpen}
//                     onDrawerToggle={handleDrawerToggle}
//                     darkMode={darkMode}
//                     drawerWidth={drawerWidth}
//                 />
//                 <Box
//                     component="main"
//                     sx={{
//                         flexGrow: 1,
//                         p: 4,
//                         width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : miniDrawerWidth}px)` },
//                         ml: { sm: `${sidebarOpen ? drawerWidth : miniDrawerWidth}px` },
//                         transition: theme.transitions.create(['width', 'margin'], {
//                             easing: theme.transitions.easing.sharp,
//                             duration: theme.transitions.duration.leavingScreen,
//                         }),
//                         mt: `${theme.mixins.toolbar.minHeight + 8}px`,
//                         minHeight: '100vh',
//                     }}
//                 >
//                     <Routes>
//                         <Route path="/" element={<Navigate to="/home" replace />} />
//                         <Route path="/home" element={<Home />} />
//                         <Route path="/orders" element={<Orders />} />
//                         <Route path="/technicians" element={<Technicians />} />
//                         <Route path="/scheduler" element={<TechScheduler />} />
//                         <Route path="*" element={<Navigate to="/home" replace />} />
//                     </Routes>
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// }
//
// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Home from '../pages/Home';
import Orders from '../pages/Orders';
import Technicians from '../pages/Technicians';
import TechScheduler from '../pages/TechScheduler';

const drawerWidth = 240;
const miniDrawerWidth = 64;

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const navigate = useNavigate();
    const theme = darkMode ? darkTheme : lightTheme;

    // Simple auth check on mount
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!user || !token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleThemeToggle = () => {
        setDarkMode(prevMode => !prevMode);
        localStorage.setItem('darkMode', !darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default }}>
                <Navbar
                    onToggleSidebar={handleDrawerToggle}
                    onToggleTheme={handleThemeToggle}
                    darkMode={darkMode}
                    isOpen={sidebarOpen}
                    drawerWidth={drawerWidth}
                />
                <Sidebar
                    open={sidebarOpen}
                    onDrawerToggle={handleDrawerToggle}
                    darkMode={darkMode}
                    drawerWidth={drawerWidth}
                />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 4,
                        width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : miniDrawerWidth}px)` },
                        ml: { sm: `${sidebarOpen ? drawerWidth : miniDrawerWidth}px` },
                        transition: theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        mt: `${theme.mixins.toolbar.minHeight + 8}px`,
                        minHeight: '100vh',
                    }}
                >
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/technicians" element={<Technicians />} />
                        <Route path="/scheduler" element={<TechScheduler />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;