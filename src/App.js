


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