// import React from 'react';
// import {
//     AppBar,
//     Toolbar,
//     IconButton,
//     Typography,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
//
// const Navbar = ({ handleDrawerToggle }) => {
//     return (
//         <AppBar
//             position="fixed"
//             sx={{
//                 zIndex: (theme) => theme.zIndex.drawer + 1,
//             }}
//         >
//             <Toolbar>
//                 <IconButton
//                     color="inherit"
//                     aria-label="toggle drawer"
//                     edge="start"
//                     onClick={handleDrawerToggle}
//                     sx={{ mr: 2 }}
//                 >
//                     <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" noWrap component="div">
//                     Sistema de Agendamiento Técnico
//                 </Typography>
//             </Toolbar>
//         </AppBar>
//     );
// };
//
// export default Navbar;

import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Divider,
    Snackbar,
    Alert,
    Badge,
    List,
    ListItem,
    ListItemText,
    Popover,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

// Importa los logos
import LogoBlanco from '../../assets/BLANCO1.png';
import LogoNegro from '../../assets/NEGRO1.png';

function Navbar({ onToggleSidebar, onToggleTheme, darkMode }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (err) {
            console.error('Error parsing user data:', err);
            setError('Error loading user data');
        }
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (err) {
            console.error('Error during logout:', err);
            setError('Error during logout. Please try again.');
        } finally {
            handleClose();
        }
    };

    const handleErrorClose = () => {
        setError(null);
    };

    const handleOrdersClick = () => {
        navigate('/orders');
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: 1,
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onToggleSidebar}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <img
                            src={darkMode ? LogoBlanco : LogoNegro}
                            alt="Logo"
                            style={{ height: '30px', marginRight: '10px', cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        />
                        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '40px' }} />
                        <ConfirmationNumberIcon sx={{ mr: 1, cursor: 'pointer' }} onClick={handleOrdersClick} />
                        <Typography variant="h5" noWrap component="div" sx={{ cursor: 'pointer' }} onClick={handleOrdersClick}>
                            Soporte Técnico
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            onClick={onToggleTheme}
                            sx={{ mr: 1 }}
                            aria-label="toggle theme"
                        >
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={handleNotificationClick}
                            sx={{ mr: 1 }}
                        >
                            <Badge
                                badgeContent={unreadCount}
                                color="error"
                                invisible={unreadCount === 0}
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {user && (
                            <>
                                {!isMobile && (
                                    <Typography variant="body1" sx={{ mr: 1 }}>
                                        {user.username}
                                    </Typography>
                                )}
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                        {user.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleProfile}>
                                        <AccountCircleIcon sx={{ mr: 1 }} />
                                        Mi cuenta
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <ExitToAppIcon sx={{ mr: 1 }} />
                                        Cerrar sesión
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Popover
                open={Boolean(notificationAnchorEl)}
                anchorEl={notificationAnchorEl}
                onClose={handleNotificationClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List sx={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <ListItem
                                key={notification.id}
                                sx={{
                                    backgroundColor: notification.is_read ? 'inherit' : theme.palette.action.hover,
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemText
                                    primary={notification.message}
                                    secondary={new Date(notification.created_at).toLocaleString()}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No tienes notificaciones" />
                        </ListItem>
                    )}
                </List>
            </Popover>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Navbar;