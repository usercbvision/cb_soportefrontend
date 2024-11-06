// // import React from 'react';
// // import {
// //     Box,
// //     Drawer,
// //     List,
// //     ListItem,
// //     ListItemButton,
// //     ListItemIcon,
// //     ListItemText,
// //     Toolbar,
// // } from '@mui/material';
// // import {
// //     Dashboard as DashboardIcon,
// //     Assignment as AssignmentIcon,
// //     Engineering as EngineeringIcon,
// // } from '@mui/icons-material';
// // import { useNavigate, useLocation } from 'react-router-dom';
// //
// // const menuItems = [
// //     { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
// //     { text: 'Órdenes', icon: <AssignmentIcon />, path: '/orders' },
// //     { text: 'Técnicos', icon: <EngineeringIcon />, path: '/technicians' },
// // ];
// //
// // const Sidebar = ({
// //                      mobileOpen,
// //                      isMinimized,
// //                      handleDrawerToggle,
// //                      drawerWidth,
// //                      miniDrawerWidth
// //                  }) => {
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //
// //     const drawer = (
// //         <>
// //             <Toolbar />
// //             <List>
// //                 {menuItems.map((item) => (
// //                     <ListItem key={item.text} disablePadding>
// //                         <ListItemButton
// //                             selected={location.pathname === item.path}
// //                             onClick={() => {
// //                                 navigate(item.path);
// //                                 if (window.innerWidth < 600) {
// //                                     handleDrawerToggle();
// //                                 }
// //                             }}
// //                             sx={{
// //                                 minHeight: 48,
// //                                 justifyContent: isMinimized ? 'center' : 'initial',
// //                                 px: 2.5,
// //                             }}
// //                         >
// //                             <ListItemIcon
// //                                 sx={{
// //                                     minWidth: 0,
// //                                     mr: isMinimized ? 'auto' : 3,
// //                                     justifyContent: 'center',
// //                                 }}
// //                             >
// //                                 {item.icon}
// //                             </ListItemIcon>
// //                             <ListItemText
// //                                 primary={item.text}
// //                                 sx={{
// //                                     opacity: isMinimized ? 0 : 1,
// //                                     display: isMinimized ? 'none' : 'block'
// //                                 }}
// //                             />
// //                         </ListItemButton>
// //                     </ListItem>
// //                 ))}
// //             </List>
// //         </>
// //     );
// //
// //     return (
// //         <Box
// //             component="nav"
// //             sx={{
// //                 width: {
// //                     sm: isMinimized ? miniDrawerWidth : drawerWidth
// //                 },
// //                 flexShrink: { sm: 0 }
// //             }}
// //         >
// //             {/* Mobile drawer */}
// //             <Drawer
// //                 variant="temporary"
// //                 open={mobileOpen}
// //                 onClose={handleDrawerToggle}
// //                 ModalProps={{
// //                     keepMounted: true,
// //                 }}
// //                 sx={{
// //                     display: { xs: 'block', sm: 'none' },
// //                     '& .MuiDrawer-paper': {
// //                         boxSizing: 'border-box',
// //                         width: drawerWidth
// //                     },
// //                 }}
// //             >
// //                 {drawer}
// //             </Drawer>
// //             {/* Desktop drawer */}
// //             <Drawer
// //                 variant="permanent"
// //                 sx={{
// //                     display: { xs: 'none', sm: 'block' },
// //                     '& .MuiDrawer-paper': {
// //                         boxSizing: 'border-box',
// //                         width: isMinimized ? miniDrawerWidth : drawerWidth,
// //                         transition: theme => theme.transitions.create('width', {
// //                             easing: theme.transitions.easing.sharp,
// //                             duration: theme.transitions.duration.enteringScreen,
// //                         }),
// //                         overflowX: 'hidden'
// //                     },
// //                 }}
// //                 open
// //             >
// //                 {drawer}
// //             </Drawer>
// //         </Box>
// //     );
// // };
// //
// // export default Sidebar;
//
//
//
//
//
//
//
// import React, { useState, useEffect } from 'react';
// import {
//     Drawer,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     Box,
//     IconButton,
//     useTheme,
//     Divider,
// } from '@mui/material';
// import {
//     Home as HomeIcon,
//     Assignment as AssignmentIcon,
//     Engineering as EngineeringIcon,
//     BarChart as BarChartIcon,
//     MenuBook as MenuBookIcon,
//     ChevronLeft as ChevronLeftIcon,
//     ChevronRight as ChevronRightIcon,
//     Settings as SettingsIcon,
// } from '@mui/icons-material';
// import { Link, useLocation } from 'react-router-dom';
//
// function Sidebar({ open, onDrawerToggle, darkMode, drawerWidth }) {
//     const [selectedItem, setSelectedItem] = useState('');
//     const location = useLocation();
//     const theme = useTheme();
//
//     useEffect(() => {
//         const currentPath = location.pathname.split('/')[1];
//         const currentItem = menuItems.find(item => item.path.includes(currentPath));
//         if (currentItem) {
//             setSelectedItem(currentItem.text);
//         }
//     }, [location]);
//
//     const handleItemClick = (itemText) => {
//         setSelectedItem(itemText);
//     };
//
//     const menuItems = [
//         { text: 'Inicio', icon: <HomeIcon />, path: '/home' },
//         { text: 'Agendamientos', icon: <AssignmentIcon />, path: '/orders' },
//         { text: 'Técnicos', icon: <EngineeringIcon />, path: '/technicians' },
//         { text: 'Estadísticas', icon: <BarChartIcon />, path: '/stats' },
//         { text: 'Manuales', icon: <MenuBookIcon />, path: '/manuals' },
//     ];
//
//     const drawer = (
//         <Box
//             sx={{
//                 width: open ? drawerWidth : theme.spacing(7),
//                 backgroundColor: theme.palette.background.paper,
//                 color: theme.palette.text.primary,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflowX: 'hidden',
//                 transition: theme.transitions.create(['width', 'background-color'], {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.short,
//                 }),
//             }}
//         >
//             <Box display="flex" justifyContent="flex-end" p={1}>
//                 <IconButton onClick={onDrawerToggle} sx={{ color: 'inherit' }}>
//                     {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                 </IconButton>
//             </Box>
//             <Divider />
//             <List sx={{ flexGrow: 1, mt: 2 }}>
//                 {menuItems.map((item) => (
//                     <ListItem
//                         button
//                         component={Link}
//                         to={item.path}
//                         selected={selectedItem === item.text}
//                         onClick={() => handleItemClick(item.text)}
//                         key={item.text}
//                         sx={{
//                             py: 1.5,
//                             px: 2,
//                             my: 0.5,
//                             '&.Mui-selected': {
//                                 backgroundColor: theme.palette.action.selected,
//                                 '&:hover': {
//                                     backgroundColor: theme.palette.action.hover,
//                                 },
//                             },
//                             '&:hover': {
//                                 backgroundColor: theme.palette.action.hover,
//                             },
//                             minHeight: 48,
//                             justifyContent: open ? 'initial' : 'center',
//                         }}
//                     >
//                         <ListItemIcon
//                             sx={{
//                                 color: 'inherit',
//                                 minWidth: 40,
//                                 mr: open ? 2 : 'auto',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             {item.icon}
//                         </ListItemIcon>
//                         <ListItemText
//                             primary={item.text}
//                             sx={{
//                                 opacity: open ? 1 : 0,
//                                 display: open ? 'block' : 'none'
//                             }}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 <ListItem
//                     button
//                     component={Link}
//                     to="/settings"
//                     selected={selectedItem === 'Configuraciones'}
//                     onClick={() => handleItemClick('Configuraciones')}
//                     sx={{
//                         py: 1.5,
//                         px: 2,
//                         '&.Mui-selected': {
//                             backgroundColor: theme.palette.action.selected,
//                             '&:hover': {
//                                 backgroundColor: theme.palette.action.hover,
//                             },
//                         },
//                         '&:hover': {
//                             backgroundColor: theme.palette.action.hover,
//                         },
//                         minHeight: 48,
//                         justifyContent: open ? 'initial' : 'center',
//                     }}
//                 >
//                     <ListItemIcon
//                         sx={{
//                             color: 'inherit',
//                             minWidth: 40,
//                             mr: open ? 2 : 'auto',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <SettingsIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                         primary="Configuraciones"
//                         sx={{
//                             opacity: open ? 1 : 0,
//                             display: open ? 'block' : 'none'
//                         }}
//                     />
//                 </ListItem>
//             </List>
//         </Box>
//     );
//
//     return (
//         <>
//             <Drawer
//                 variant="temporary"
//                 open={open}
//                 onClose={onDrawerToggle}
//                 ModalProps={{ keepMounted: true }}
//                 sx={{
//                     display: { xs: 'block', sm: 'none' },
//                     '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//                 }}
//             >
//                 {drawer}
//             </Drawer>
//             <Drawer
//                 variant="permanent"
//                 open={open}
//                 sx={{
//                     display: { xs: 'none', sm: 'block' },
//                     '& .MuiDrawer-paper': {
//                         boxSizing: 'border-box',
//                         width: open ? drawerWidth : theme.spacing(7),
//                         overflowX: 'hidden',
//                         transition: theme.transitions.create('width', {
//                             easing: theme.transitions.easing.sharp,
//                             duration: theme.transitions.duration.short,
//                         }),
//                     },
//                 }}
//             >
//                 {drawer}
//             </Drawer>
//         </>
//     );
// }
//
// export default Sidebar;
//


import React, { useState, useEffect } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    IconButton,
    useTheme,
    Divider,
} from '@mui/material';
import {
    Home as HomeIcon,
    Assignment as AssignmentIcon,
    Engineering as EngineeringIcon,
    BarChart as BarChartIcon,
    MenuBook as MenuBookIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ open, onDrawerToggle, drawerWidth = 240 }) {
    const [selectedItem, setSelectedItem] = useState('');
    const location = useLocation();
    const theme = useTheme();

    // Definimos colores personalizados según el tema
    const iconColor = theme.palette.mode === 'dark' ? '#fff' : '#666';
    const selectedIconColor = theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main;
    const selectedBgColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';
    const hoverBgColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';

    useEffect(() => {
        const currentPath = location.pathname.split('/')[1];
        const currentItem = menuItems.find(item => item.path.includes(currentPath));
        if (currentItem) {
            setSelectedItem(currentItem.text);
        }
    }, [location]);

    const handleItemClick = (itemText) => {
        setSelectedItem(itemText);
    };

    const menuItems = [
        // { text: 'Inicio', icon: <HomeIcon />, path: '/home' },
        { text: 'Inicio', icon: <HomeIcon />, path: '/technicians' },
        // { text: 'Agendamientos', icon: <AssignmentIcon />, path: '/orders' },
        { text: 'Técnicos', icon: <EngineeringIcon />, path: '/technicians' },
        // { text: 'Estadísticas', icon: <BarChartIcon />, path: '/stats' },
        // { text: 'Manuales', icon: <MenuBookIcon />, path: '/manuals' },
    ];

    const drawer = (
        <Box
            sx={{
                width: open ? drawerWidth : theme.spacing(7),
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                transition: theme.transitions.create(['width', 'background-color'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.short,
                }),
            }}
        >
            <Box display="flex" justifyContent="flex-end" p={1}>
                <IconButton
                    onClick={onDrawerToggle}
                    sx={{
                        color: iconColor
                    }}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1, mt: 2 }}>
                {menuItems.map((item) => {
                    const isSelected = selectedItem === item.text;
                    return (
                        <ListItem
                            button
                            component={Link}
                            to={item.path}
                            selected={isSelected}
                            onClick={() => handleItemClick(item.text)}
                            key={item.text}
                            sx={{
                                py: 1.5,
                                px: 2,
                                my: 0.5,
                                '&.Mui-selected': {
                                    backgroundColor: selectedBgColor,
                                    '&:hover': {
                                        backgroundColor: hoverBgColor,
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: hoverBgColor,
                                },
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isSelected ? selectedIconColor : iconColor,
                                    minWidth: 40,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    opacity: open ? 1 : 0,
                                    display: open ? 'block' : 'none',
                                    color: isSelected ? selectedIconColor : 'inherit',
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
            {/*<List>*/}
            {/*    <ListItem*/}
            {/*        button*/}
            {/*        component={Link}*/}
            {/*        to="/settings"*/}
            {/*        selected={selectedItem === 'Configuraciones'}*/}
            {/*        onClick={() => handleItemClick('Configuraciones')}*/}
            {/*        sx={{*/}
            {/*            py: 1.5,*/}
            {/*            px: 2,*/}
            {/*            '&.Mui-selected': {*/}
            {/*                backgroundColor: selectedBgColor,*/}
            {/*                '&:hover': {*/}
            {/*                    backgroundColor: hoverBgColor,*/}
            {/*                },*/}
            {/*            },*/}
            {/*            '&:hover': {*/}
            {/*                backgroundColor: hoverBgColor,*/}
            {/*            },*/}
            {/*            minHeight: 48,*/}
            {/*            justifyContent: open ? 'initial' : 'center',*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <ListItemIcon*/}
            {/*            sx={{*/}
            {/*                color: selectedItem === 'Configuraciones' ? selectedIconColor : iconColor,*/}
            {/*                minWidth: 40,*/}
            {/*                mr: open ? 2 : 'auto',*/}
            {/*                justifyContent: 'center',*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <SettingsIcon />*/}
            {/*        </ListItemIcon>*/}
            {/*        */}
            {/*        */}
            {/*        */}
            {/*        <ListItemText*/}
            {/*            primary="Configuraciones"*/}
            {/*            sx={{*/}
            {/*                opacity: open ? 1 : 0,*/}
            {/*                display: open ? 'block' : 'none',*/}
            {/*                color: selectedItem === 'Configuraciones' ? selectedIconColor : 'inherit',*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </ListItem>*/}
            {/*</List>*/}
        </Box>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={open}
                onClose={onDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: open ? drawerWidth : theme.spacing(7),
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.short,
                        }),
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Sidebar;
