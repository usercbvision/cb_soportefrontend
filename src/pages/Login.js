// import React, { useState } from 'react';
// import {
//     TextField,
//     Button,
//     Typography,
//     Box,
//     IconButton,
//     InputAdornment,
//     Snackbar,
//     CircularProgress,
//     CssBaseline,
//     Grid,
//     FormControlLabel,
//     Switch,
//     Backdrop,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Alert
// } from '@mui/material';
// import {
//     Visibility,
//     VisibilityOff,
//     AccountCircle,
//     Lock,
//     Brightness4,
//     Brightness7
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import { lightTheme, darkTheme } from '../theme';
//
// const testUsers = [
//     { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador Principal' },
//     { username: 'agenda', password: 'agenda123', role: 'agendamiento', name: 'Control Agendamiento' },
//     { username: 'super', password: 'super123', role: 'supervisor', name: 'Supervisor General' },
//     { username: 'jefe', password: 'jefe123', role: 'jefe_tecnico', name: 'Jefe Técnico' },
//     { username: 'tecnico', password: 'tecnico123', role: 'tecnico', name: 'Técnico Base' }
// ];
//
// const Login = () => {
//     const navigate = useNavigate();
//     const [credentials, setCredentials] = useState({ username: '', password: '' });
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showLoadingScreen, setShowLoadingScreen] = useState(false);
//     const [darkMode, setDarkMode] = useState(() => {
//         const savedMode = localStorage.getItem('darkMode');
//         return savedMode === 'true';
//     });
//     const [showTestAccounts, setShowTestAccounts] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//
//     const theme = darkMode ? darkTheme : lightTheme;
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCredentials(prev => ({ ...prev, [name]: value }));
//         setError('');
//     };
//
//     const handleTestAccountSelect = (user) => {
//         setCredentials({
//             username: user.username,
//             password: user.password
//         });
//         setError('');
//     };
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setShowLoadingScreen(true);
//
//         try {
//             const user = testUsers.find(
//                 u => u.username === credentials.username && u.password === credentials.password
//             );
//
//             if (user) {
//                 await new Promise(resolve => setTimeout(resolve, 1000));
//
//                 localStorage.setItem('user', JSON.stringify({
//                     username: user.username,
//                     name: user.name,
//                     role: user.role
//                 }));
//
//                 setSnackbarOpen(true);
//                 setTimeout(() => {
//                     setShowLoadingScreen(false);
//                     navigate('/home');
//                 }, 1000);
//             } else {
//                 setError('Usuario o contraseña incorrectos');
//                 setShowLoadingScreen(false);
//             }
//         } catch (error) {
//             console.error('Error durante el login:', error);
//             setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
//             setShowLoadingScreen(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: 'url(https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg)',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: theme.palette.primary.main,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         position: 'relative',
//                         '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                             zIndex: 1
//                         }
//                     }}
//                 />
//                 <Grid
//                     item
//                     xs={12}
//                     sm={8}
//                     md={5}
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         bgcolor: theme.palette.background.paper,
//                         p: 4
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             width: '100%',
//                             maxWidth: '400px'
//                         }}
//                     >
//                         <img
//                             src="https://www.cbvision.net.ec/wp-content/uploads/2023/10/cbvision-logo@1x-sticky.png"
//                             alt="Logo CBVision"
//                             style={{ width: '180px', marginBottom: '24px' }}
//                         />
//
//                         <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 700, color: theme.palette.primary.main }}>
//                             Sistema de Agendamiento
//                         </Typography>
//
//                         {error && (
//                             <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
//                                 {error}
//                             </Alert>
//                         )}
//
//                         <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="Usuario"
//                                 name="username"
//                                 autoComplete="username"
//                                 value={credentials.username}
//                                 onChange={handleChange}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <AccountCircle color="primary" />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Contraseña"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={credentials.password}
//                                 onChange={handleChange}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Lock color="primary" />
//                                         </InputAdornment>
//                                     ),
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton onClick={() => setShowPassword(!showPassword)}>
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 disabled={isLoading}
//                                 sx={{ mt: 3, mb: 2 }}
//                             >
//                                 {isLoading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
//                             </Button>
//
//                             <Box sx={{ mt: 2 }}>
//                                 <Button
//                                     fullWidth
//                                     variant="text"
//                                     onClick={() => setShowTestAccounts(!showTestAccounts)}
//                                 >
//                                     {showTestAccounts ? 'Ocultar Cuentas de Prueba' : 'Mostrar Cuentas de Prueba'}
//                                 </Button>
//
//                                 {showTestAccounts && (
//                                     <FormControl fullWidth sx={{ mt: 2 }}>
//                                         <InputLabel>Seleccionar Cuenta de Prueba</InputLabel>
//                                         <Select
//                                             value=""
//                                             label="Seleccionar Cuenta de Prueba"
//                                             onChange={(e) => {
//                                                 const user = testUsers.find(u => u.username === e.target.value);
//                                                 if (user) handleTestAccountSelect(user);
//                                             }}
//                                         >
//                                             {testUsers.map((user) => (
//                                                 <MenuItem key={user.username} value={user.username}>
//                                                     {user.name} ({user.role})
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 )}
//                             </Box>
//
//                             <FormControlLabel
//                                 control={
//                                     <Switch
//                                         checked={darkMode}
//                                         onChange={() => setDarkMode(!darkMode)}
//                                     />
//                                 }
//                                 label={darkMode ? "Modo Oscuro" : "Modo Claro"}
//                                 sx={{ mt: 2 }}
//                             />
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>
//
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={2000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message="Inicio de sesión exitoso"
//             />
//
//             <Backdrop
//                 sx={{
//                     color: '#fff',
//                     zIndex: theme => theme.zIndex.drawer + 1,
//                     flexDirection: 'column',
//                     '& > *': { marginBottom: 2 }
//                 }}
//                 open={showLoadingScreen}
//             >
//                 <Box sx={{ position: 'relative', display: 'inline-flex' }}>
//                     <CircularProgress color="inherit" size={100} />
//                     <Box
//                         sx={{
//                             top: 0,
//                             left: 0,
//                             bottom: 0,
//                             right: 0,
//                             position: 'absolute',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <img
//                             src="https://www.cbvision.net.ec/wp-content/uploads/2024/09/LOGOCBBLANCO.png"
//                             alt="Logo CBVision"
//                             style={{ width: '70px' }}
//                         />
//                     </Box>
//                 </Box>
//                 <Typography variant="h5" sx={{ mt: 2 }}>Iniciando sesión</Typography>
//                 <Typography variant="body1">Verificando credenciales...</Typography>
//             </Backdrop>
//         </ThemeProvider>
//     );
// };
//
// export default Login;



import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
    InputAdornment,
    Snackbar,
    CircularProgress,
    CssBaseline,
    Grid,
    FormControlLabel,
    Switch,
    Backdrop,
    Alert
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    AccountCircle,
    Lock,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';
import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_LOGIN_ENDPOINT}`;

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const theme = darkMode ? darkTheme : lightTheme;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setShowLoadingScreen(true);

        try {
            const response = await axios.post(apiUrl, credentials);

            if (response.status === 200) {
                const { token, user } = response.data;

                // Guardar token y datos del usuario
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setSnackbarOpen(true);

                // Redirección después de un breve delay para mostrar el mensaje de éxito
                setTimeout(() => {
                    setShowLoadingScreen(false);
                    navigate('/home');
                }, 1000);
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            setError(error.response?.data?.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
            setShowLoadingScreen(false);
        } finally {
            setIsLoading(false);
        }
    };

    console.log('API URL:', process.env.REACT_APP_API_URL);
    console.log('LOGIN ENDPOINT:', process.env.REACT_APP_LOGIN_ENDPOINT);
    console.log('URL completa:', `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_LOGIN_ENDPOINT}`);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: theme.palette.primary.main,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1
                        }
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: theme.palette.background.paper,
                        p: 4
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '400px'
                        }}
                    >
                        <img
                            src="https://www.cbvision.net.ec/wp-content/uploads/2023/10/cbvision-logo@1x-sticky.png"
                            alt="Logo CBVision"
                            style={{ width: '180px', marginBottom: '24px' }}
                        />

                        <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 700, color: theme.palette.primary.main }}>
                            Sistema de Soporte técnico
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Usuario"
                                name="username"
                                autoComplete="username"
                                value={credentials.username}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                value={credentials.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isLoading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
                            </Button>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                    />
                                }
                                label={darkMode ? "Modo Oscuro" : "Modo Claro"}
                                sx={{ mt: 2 }}
                            />
                        </Box>
                    </Box>

                    <Typography
                        variant="caption"
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            opacity: 0.4,
                        }}
                    >
                        v1.0.0 - Beta
                    </Typography>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message="Inicio de sesión exitoso"
            />

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: theme => theme.zIndex.drawer + 1,
                    flexDirection: 'column',
                    '& > *': { marginBottom: 2 }
                }}
                open={showLoadingScreen}
            >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress color="inherit" size={100} />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="https://www.cbvision.net.ec/wp-content/uploads/2024/09/LOGOCBBLANCO.png"
                            alt="Logo CBVision"
                            style={{ width: '70px' }}
                        />
                    </Box>
                </Box>
                <Typography variant="h5" sx={{ mt: 2 }}>Iniciando sesión</Typography>
                <Typography variant="body1">Verificando credenciales...</Typography>
            </Backdrop>
        </ThemeProvider>
    );
};

export default Login;