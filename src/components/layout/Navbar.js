// //
// // import React, { useState, useEffect } from 'react';
// // import {
// //     AppBar,
// //     Toolbar,
// //     Typography,
// //     IconButton,
// //     Avatar,
// //     Box,
// //     Menu,
// //     MenuItem,
// //     useTheme,
// //     useMediaQuery,
// //     Divider,
// //     Snackbar,
// //     Alert,
// //     Badge,
// //     List,
// //     ListItem,
// //     ListItemText,
// //     Popover,
// // } from '@mui/material';
// // import { styled } from '@mui/material/styles';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// // import Brightness4Icon from '@mui/icons-material/Brightness4';
// // import Brightness7Icon from '@mui/icons-material/Brightness7';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import { useNavigate } from 'react-router-dom';
// //
// // // Importa los logos
// // import LogoBlanco from '../../assets/BLANCO1.png';
// // import LogoNegro from '../../assets/NEGRO1.png';
// //
// // function Navbar({ onToggleSidebar, onToggleTheme, darkMode }) {
// //     const [anchorEl, setAnchorEl] = useState(null);
// //     const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
// //     const [user, setUser] = useState(null);
// //     const [error, setError] = useState(null);
// //     const [notifications, setNotifications] = useState([]);
// //     const [unreadCount, setUnreadCount] = useState(0);
// //     const navigate = useNavigate();
// //     const theme = useTheme();
// //     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// //
// //     useEffect(() => {
// //         try {
// //             const userData = sessionStorage.getItem('user');
// //             if (userData) {
// //                 setUser(JSON.parse(userData));
// //             }
// //         } catch (err) {
// //             console.error('Error parsing user data:', err);
// //             setError('Error loading user data');
// //         }
// //     }, []);
// //
// //     const handleMenu = (event) => {
// //         setAnchorEl(event.currentTarget);
// //     };
// //
// //     const handleNotificationClick = (event) => {
// //         setNotificationAnchorEl(event.currentTarget);
// //     };
// //
// //     const handleClose = () => {
// //         setAnchorEl(null);
// //     };
// //
// //     const handleNotificationClose = () => {
// //         setNotificationAnchorEl(null);
// //     };
// //
// //     const handleProfile = () => {
// //         navigate('/profile');
// //         handleClose();
// //     };
// //
// //     const handleLogout = () => {
// //         try {
// //             sessionStorage.removeItem('token');
// //             sessionStorage.removeItem('user');
// //             navigate('/login');
// //         } catch (err) {
// //             console.error('Error during logout:', err);
// //             setError('Error during logout. Please try again.');
// //         } finally {
// //             handleClose();
// //         }
// //     };
// //
// //     const handleErrorClose = () => {
// //         setError(null);
// //     };
// //
// //     const handleOrdersClick = () => {
// //         navigate('/orders');
// //     };
// //
// //     return (
// //         <>
// //             <AppBar
// //                 position="fixed"
// //                 sx={{
// //                     zIndex: theme.zIndex.drawer + 1,
// //                     backgroundColor: theme.palette.background.paper,
// //                     color: theme.palette.text.primary,
// //                     boxShadow: 1,
// //                 }}
// //             >
// //                 <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <IconButton
// //                         color="inherit"
// //                         aria-label="open drawer"
// //                         edge="start"
// //                         onClick={onToggleSidebar}
// //                         sx={{ mr: 2 }}
// //                     >
// //                         <MenuIcon />
// //                     </IconButton>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
// //                         <img
// //                             src={darkMode ? LogoBlanco : LogoNegro}
// //                             alt="Logo"
// //                             style={{ height: '30px', marginRight: '10px', cursor: 'pointer' }}
// //                             onClick={() => navigate('/')}
// //                         />
// //                         <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '40px' }} />
// //                         <ConfirmationNumberIcon sx={{ mr: 1, cursor: 'pointer' }} onClick={handleOrdersClick} />
// //                         <Typography variant="h5" noWrap component="div" sx={{ cursor: 'pointer' }} onClick={handleOrdersClick}>
// //                             Soporte Técnico
// //                         </Typography>
// //                     </Box>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                         <IconButton
// //                             color="inherit"
// //                             onClick={onToggleTheme}
// //                             sx={{ mr: 1 }}
// //                             aria-label="toggle theme"
// //                         >
// //                             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
// //                         </IconButton>
// //                         <IconButton
// //                             color="inherit"
// //                             onClick={handleNotificationClick}
// //                             sx={{ mr: 1 }}
// //                         >
// //                             <Badge
// //                                 badgeContent={unreadCount}
// //                                 color="error"
// //                                 invisible={unreadCount === 0}
// //                             >
// //                                 <NotificationsIcon />
// //                             </Badge>
// //                         </IconButton>
// //                         {user && (
// //                             <>
// //                                 {!isMobile && (
// //                                     <Typography variant="body1" sx={{ mr: 1 }}>
// //                                         {user.username}
// //                                     </Typography>
// //                                 )}
// //                                 <IconButton
// //                                     size="large"
// //                                     aria-label="account of current user"
// //                                     aria-controls="menu-appbar"
// //                                     aria-haspopup="true"
// //                                     onClick={handleMenu}
// //                                     color="inherit"
// //                                 >
// //                                     <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
// //                                         {user.username?.charAt(0).toUpperCase()}
// //                                     </Avatar>
// //                                 </IconButton>
// //                                 <Menu
// //                                     id="menu-appbar"
// //                                     anchorEl={anchorEl}
// //                                     anchorOrigin={{
// //                                         vertical: 'bottom',
// //                                         horizontal: 'right',
// //                                     }}
// //                                     keepMounted
// //                                     transformOrigin={{
// //                                         vertical: 'top',
// //                                         horizontal: 'right',
// //                                     }}
// //                                     open={Boolean(anchorEl)}
// //                                     onClose={handleClose}
// //                                 >
// //                                     {/*<MenuItem onClick={handleProfile}>*/}
// //                                     {/*    <AccountCircleIcon sx={{ mr: 1 }} />*/}
// //                                     {/*    Mi cuenta*/}
// //                                     {/*</MenuItem>*/}
// //                                     <MenuItem onClick={handleLogout}>
// //                                         <ExitToAppIcon sx={{ mr: 1 }} />
// //                                         Cerrar sesión
// //                                     </MenuItem>
// //                                 </Menu>
// //                             </>
// //                         )}
// //                     </Box>
// //                 </Toolbar>
// //             </AppBar>
// //
// //             <Popover
// //                 open={Boolean(notificationAnchorEl)}
// //                 anchorEl={notificationAnchorEl}
// //                 onClose={handleNotificationClose}
// //                 anchorOrigin={{
// //                     vertical: 'bottom',
// //                     horizontal: 'right',
// //                 }}
// //                 transformOrigin={{
// //                     vertical: 'top',
// //                     horizontal: 'right',
// //                 }}
// //             >
// //                 <List sx={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
// //                     {notifications.length > 0 ? (
// //                         notifications.map((notification) => (
// //                             <ListItem
// //                                 key={notification.id}
// //                                 sx={{
// //                                     backgroundColor: notification.is_read ? 'inherit' : theme.palette.action.hover,
// //                                     cursor: 'pointer',
// //                                 }}
// //                             >
// //                                 <ListItemText
// //                                     primary={notification.message}
// //                                     secondary={new Date(notification.created_at).toLocaleString()}
// //                                 />
// //                             </ListItem>
// //                         ))
// //                     ) : (
// //                         <ListItem>
// //                             <ListItemText primary="No tienes notificaciones" />
// //                         </ListItem>
// //                     )}
// //                 </List>
// //             </Popover>
// //
// //             <Snackbar open={!!error} autoHideDuration={6000} onClose={handleErrorClose}>
// //                 <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
// //                     {error}
// //                 </Alert>
// //             </Snackbar>
// //         </>
// //     );
// // }
// //
// // export default Navbar;
//
//
// import React, { useState, useEffect } from 'react';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     IconButton,
//     Avatar,
//     Box,
//     Menu,
//     MenuItem,
//     useTheme,
//     useMediaQuery,
//     Divider,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { useNavigate } from 'react-router-dom';
//
// // Importa los logos
// import LogoBlanco from '../../assets/BLANCO1.png';
// import LogoNegro from '../../assets/NEGRO1.png';
//
// function Navbar({ onToggleSidebar, onToggleTheme, darkMode }) {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//
//     useEffect(() => {
//         try {
//             const userData = sessionStorage.getItem('user');
//             if (userData) {
//                 setUser(JSON.parse(userData));
//             } else {
//                 window.location.href = '/login';
//             }
//         } catch (err) {
//             console.error('Error parsing user data:', err);
//             window.location.href = '/login';
//         }
//     }, []);
//
//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//
//     const handleLogout = () => {
//         try {
//             // Primero limpiamos localStorage
//             sessionStorage.removeItem('token');
//             sessionStorage.removeItem('usersoporte');
//
//             // Cerramos el menú
//             handleClose();
//
//             // Hacemos un refresh de la página que activará el useEffect
//             window.location.href = '/soporte/login';
//         } catch (err) {
//             console.error('Error during logout:', err);
//             window.location.href = '/login';
//         }
//     };
//
//     const handleOrdersClick = () => {
//         navigate('/orders');
//     };
//
//     if (!user) return null;
//
//     return (
//         <AppBar
//             position="fixed"
//             sx={{
//                 zIndex: theme.zIndex.drawer + 1,
//                 backgroundColor: theme.palette.background.paper,
//                 color: theme.palette.text.primary,
//                 boxShadow: 1,
//             }}
//         >
//             <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
//                 <IconButton
//                     color="inherit"
//                     aria-label="open drawer"
//                     edge="start"
//                     onClick={onToggleSidebar}
//                     sx={{ mr: 2 }}
//                 >
//                     <MenuIcon />
//                 </IconButton>
//
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                     <img
//                         src={darkMode ? LogoBlanco : LogoNegro}
//                         alt="Logo"
//                         style={{ height: '30px', marginRight: '10px', cursor: 'pointer' }}
//                         onClick={() => navigate('/')}
//                     />
//                     <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '40px' }} />
//                     <ConfirmationNumberIcon
//                         sx={{ mr: 1, cursor: 'pointer' }}
//                         onClick={handleOrdersClick}
//                     />
//                     <Typography
//                         variant="h5"
//                         noWrap
//                         component="div"
//                         sx={{ cursor: 'pointer' }}
//                         onClick={handleOrdersClick}
//                     >
//                         Soporte Técnico
//                     </Typography>
//                 </Box>
//
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <IconButton
//                         color="inherit"
//                         onClick={onToggleTheme}
//                         sx={{ mr: 1 }}
//                     >
//                         {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//                     </IconButton>
//
//                     {user && (
//                         <>
//                             {!isMobile && (
//                                 <Typography variant="body1" sx={{ mr: 1 }}>
//                                     {user.username}
//                                 </Typography>
//                             )}
//                             <IconButton
//                                 size="large"
//                                 aria-label="account of current user"
//                                 aria-controls="menu-appbar"
//                                 aria-haspopup="true"
//                                 onClick={handleMenu}
//                                 color="inherit"
//                             >
//                                 <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
//                                     {user.username?.charAt(0).toUpperCase()}
//                                 </Avatar>
//                             </IconButton>
//                             <Menu
//                                 id="menu-appbar"
//                                 anchorEl={anchorEl}
//                                 anchorOrigin={{
//                                     vertical: 'bottom',
//                                     horizontal: 'right',
//                                 }}
//                                 keepMounted
//                                 transformOrigin={{
//                                     vertical: 'top',
//                                     horizontal: 'right',
//                                 }}
//                                 open={Boolean(anchorEl)}
//                                 onClose={handleClose}
//                             >
//                                 <MenuItem onClick={handleLogout}>
//                                     <ExitToAppIcon sx={{ mr: 1 }} />
//                                     Cerrar sesión
//                                 </MenuItem>
//                             </Menu>
//                         </>
//                     )}
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }
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
    Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

// Importa los logos
import LogoBlanco from '../../assets/BLANCO1.png';
import LogoNegro from '../../assets/NEGRO1.png';

// Roles permitidos
const ALLOWED_ROLES = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Jefe Agencia" },
    { id: 3, name: "Técnico" },
    { id: 7, name: "Servicio Tecnico" }
];

function Navbar({ onToggleSidebar, onToggleTheme, darkMode }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userSoporte, setUserSoporte] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        try {
            const userSoporteData = sessionStorage.getItem('usersoporte');
            if (userSoporteData) {
                const parsedUser = JSON.parse(userSoporteData);
                // Verificar si el usuario tiene roles permitidos
                const hasValidRole = parsedUser.roles?.some(role =>
                    ALLOWED_ROLES.some(allowedRole => allowedRole.id === role.id)
                );

                if (hasValidRole) {
                    setUserSoporte(parsedUser);
                } else {
                    handleInvalidSession('No tienes permisos para acceder al sistema');
                }
            } else {
                handleInvalidSession('No hay sesión activa');
            }
        } catch (err) {
            console.error('Error parsing user data:', err);
            handleInvalidSession('Error al validar la sesión');
        }
    }, []);

    const handleInvalidSession = (reason) => {
        console.error('Invalid session:', reason);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usersoporte');
        sessionStorage.removeItem('selectedSucursal');
        window.location.href = '/soporte/login';
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        try {
            // Limpiar localStorage
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('usersoporte');
            sessionStorage.removeItem('selectedSucursal');

            // Cerrar el menú
            handleClose();

            // Redirigir al login
            window.location.href = '/soporte/login';
        } catch (err) {
            console.error('Error during logout:', err);
            window.location.href = '/soporte/login';
        }
    };

    const handleOrdersClick = () => {
        navigate('/soporte/conexiones');
    };

    const getInitials = (user) => {
        if (!user) return '';
        const firstName = user.first_name || '';
        const lastName = user.last_name || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getRoleName = (user) => {
        if (!user?.roles || user.roles.length === 0) return '';
        return user.roles[0].name;
    };

    if (!userSoporte) return null;

    return (
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
                        onClick={() => navigate('/soporte/conexiones')}
                    />
                    <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '40px' }} />
                    <Tooltip title="Ir a Conexiones">
                        <IconButton
                            color="inherit"
                            onClick={handleOrdersClick}
                        >
                            <ConfirmationNumberIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ cursor: 'pointer' }}
                        onClick={handleOrdersClick}
                    >
                        Soporte Técnico
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        onClick={onToggleTheme}
                        sx={{ mr: 1 }}
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    {userSoporte && (
                        <>
                            {!isMobile && (
                                <Box sx={{ mr: 2, textAlign: 'right' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {`${userSoporte.first_name} ${userSoporte.last_name}`}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {getRoleName(userSoporte)}
                                    </Typography>
                                </Box>
                            )}
                            <Tooltip title="Menú de usuario">
                                <IconButton
                                    size="large"
                                    aria-label="cuenta de usuario"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                        {getInitials(userSoporte)}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
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
                                <MenuItem onClick={handleClose} disabled>
                                    <PersonIcon sx={{ mr: 1 }} />
                                    {userSoporte.email}
                                </MenuItem>
                                <Divider />
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
    );
}

export default Navbar;