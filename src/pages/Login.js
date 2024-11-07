


import React, { useState, useEffect } from 'react';
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
    Alert,
    Autocomplete,
    Step,
    Stepper,
    StepLabel,
    Paper
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    AccountCircle,
    Lock,
    Business
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';
import axios from 'axios';
import sucursalesConfig from '../services/sucursales.json';

const apiUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_LOGIN_ENDPOINT}`;

const Login = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
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

    useEffect(() => {
        // Limpiar la sucursal guardada al cargar el componente
        localStorage.removeItem('selectedSucursal');
    }, []);

    const handleSucursalSelection = () => {
        if (!selectedSucursal) {
            setError('Por favor seleccione una sucursal');
            return;
        }

        // Guardar la sucursal seleccionada en localStorage
        localStorage.setItem('selectedSucursal', JSON.stringify(selectedSucursal));
        setError('');
        setActiveStep(1);
    };

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

                setTimeout(() => {
                    setShowLoadingScreen(false);
                    navigate('/technicians');
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

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Seleccione una Sucursal
                        </Typography>
                        <Autocomplete
                            options={sucursalesConfig.sucursales}
                            getOptionLabel={(option) => option.nombre}
                            onChange={(_, value) => setSelectedSucursal(value)}
                            value={selectedSucursal}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Sucursal"
                                    required
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Business color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSucursalSelection}
                            sx={{ mt: 3 }}
                        >
                            Continuar
                        </Button>
                    </Box>
                );
            case 1:
                return (
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

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                                setActiveStep(0);
                                setSelectedSucursal(null);
                                localStorage.removeItem('selectedSucursal');
                            }}
                            sx={{ mt: 1 }}
                        >
                            Cambiar Sucursal
                        </Button>
                    </Box>
                );
            default:
                return null;
        }
    };

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

                        <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
                            <Step>
                                <StepLabel>Seleccionar Sucursal</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Iniciar Sesión</StepLabel>
                            </Step>
                        </Stepper>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        {renderStepContent(activeStep)}

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