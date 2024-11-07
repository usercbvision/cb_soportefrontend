


import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    CircularProgress,
    Button,
    Autocomplete,
    Snackbar,
    Alert,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
    Legend, ResponsiveContainer } from 'recharts';
import { Info, AlertTriangle, Save } from 'lucide-react';
import axios from 'axios';
import { buscarCliente } from '../services/ClientService';
import { debounce } from 'lodash';
import sucursalesConfig from '../services/sucursales.json';

const AVAILABLE_MONTHS = [
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
];

const findSucursalEndpoint = (sucursalName) => {
    const normalizedSearch = sucursalName.toUpperCase().trim();

    const sucursal = sucursalesConfig.sucursales.find(s => {
        const normalizedConfigName = s.nombre.toUpperCase().trim();
        return normalizedSearch.includes(normalizedConfigName) ||
            normalizedConfigName.includes(normalizedSearch);
    });

    if (!sucursal) {
        console.error(`No se encontró configuración para la sucursal: ${sucursalName}`);
        return null;
    }

    return {
        url: `http://${sucursal.ip}:${sucursal.puerto}`,
        sucursal
    };
};

const getDescuentoData = async (contrato, anio = 2024, mes, sucursalName) => {
    try {
        const endpoint = findSucursalEndpoint(sucursalName);
        if (!endpoint) {
            throw new Error(`No se pudo determinar el endpoint para la sucursal: ${sucursalName}`);
        }

        console.log(`Realizando petición GET a: ${endpoint.url}/cbpotencias/descuento`);

        const response = await axios.get(`${endpoint.url}/cbpotencias/descuento`, {
            params: { contrato, anio, mes }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching descuento:', error);
        throw error;
    }
};

const submitDescuento = async (data, sucursalName) => {
    try {
        const endpoint = findSucursalEndpoint(sucursalName);
        if (!endpoint) {
            throw new Error(`No se pudo determinar el endpoint para la sucursal: ${sucursalName}`);
        }

        console.log(`Realizando petición POST a: ${endpoint.url}/cbpotencias/descuento`);

        const response = await axios.post(`${endpoint.url}/cbpotencias/descuento`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const calcularPorcentajeDescuento = (indisponibilidad) => {
    if (indisponibilidad <= 1) {
        return { porcentaje: 0, observacion: "", isCritical: false };
    }
    else if (indisponibilidad <= 10) {
        return { porcentaje: 10, observacion: "", isCritical: false };
    } else if (indisponibilidad <= 20) {
        return { porcentaje: 15, observacion: "", isCritical: false };
    } else if (indisponibilidad <= 30) {
        return { porcentaje: 20, observacion: "", isCritical: false };
    } else if (indisponibilidad <= 40) {
        return { porcentaje: 25, observacion: "", isCritical: false };
    } else {
        return {
            porcentaje: 25,
            observacion: "Indisponibilidad crítica. Requiere revisión inmediata.",
            isCritical: true
        };
    }
};

function Conexiones() {
    const [searchMode, setSearchMode] = useState('complete');
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [clienteInput, setClienteInput] = useState('');
    const [selectedContrato, setSelectedContrato] = useState(null);
    const [contratos, setContratos] = useState([]);
    const [descuentoData, setDescuentoData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(AVAILABLE_MONTHS[AVAILABLE_MONTHS.length - 1]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        // Obtener la sucursal seleccionada del localStorage
        const sucursalFromStorage = JSON.parse(localStorage.getItem('selectedSucursal'));
        if (sucursalFromStorage) {
            setSelectedSucursal({
                descripcion: sucursalFromStorage.nombre,
                id_sucursal: sucursalFromStorage.id_sucursal,
                ...sucursalFromStorage
            });
        }
    }, []);

    useEffect(() => {
        if (selectedCliente?.contratos) {
            const contratosFormateados = selectedCliente.contratos.map(contrato => ({
                id: contrato,
                label: `Contrato: ${contrato}`
            }));
            setContratos(contratosFormateados);
        } else {
            setContratos([]);
        }
    }, [selectedCliente]);

    const debouncedBuscarCliente = useCallback(
        debounce(async (token, sucursalId, inputValue) => {
            if (inputValue.length >= 3 && sucursalId) {
                setLoading(true);
                try {
                    console.log(`Buscando cliente en la base de internet de: ${sucursalId}`);
                    const clientesData = await buscarCliente(token, sucursalId, inputValue, 'internet');
                    setClientes(clientesData?.clientes || []);
                } catch (err) {
                    setError('Error al buscar clientes');
                } finally {
                    setLoading(false);
                }
            }
        }, 300),
        []
    );

    const formatearFecha = (fechaStr) => {
        const fecha = new Date(fechaStr);
        const fechaAjustada = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
        return {
            corta: fechaAjustada.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short'
            }).replace('.', ''),
            completa: fechaAjustada.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    };

    const processData = (lecturas) => {
        return lecturas.map(lectura => {
            const indisponibilidad = (lectura.horas_cliente / lectura.horas_reales) * 100;
            const fechas = formatearFecha(lectura.fecha);
            return {
                fecha: fechas.corta,
                fechaCompleta: fechas.completa,
                indisponibilidad
            };
        });
    };

    const calculateTrendLine = (data) => {
        const n = data.length;
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXX = 0;

        data.forEach((point, index) => {
            sumX += index;
            sumY += point.indisponibilidad;
            sumXY += index * point.indisponibilidad;
            sumXX += index * index;
        });

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return data.map((point, index) => ({
            ...point,
            tendencia: slope * index + intercept
        }));
    };

    const fetchDescuentoData = async () => {
        let contratoId;
        if (searchMode === 'complete') {
            contratoId = selectedContrato?.id || selectedContrato?.label;
        } else {
            contratoId = selectedContrato?.value || selectedContrato?.label;
        }

        if (!contratoId || !selectedSucursal || !selectedMonth) return;

        try {
            setLoading(true);
            const response = await getDescuentoData(
                contratoId,
                2024,
                selectedMonth.value,
                selectedSucursal.descripcion
            );

            const descuento = response.data.descuento;
            let processedData = processData(descuento.lecturas);
            processedData = calculateTrendLine(processedData);

            const promedioDiarioIndisponibilidad =
                processedData.reduce((acc, curr) => acc + curr.indisponibilidad, 0) / processedData.length;

            const { porcentaje: descuentoCalculado, observacion, isCritical } =
                calcularPorcentajeDescuento(Math.round(promedioDiarioIndisponibilidad));

            setDescuentoData({
                lecturas: processedData,
                promedioDiarioIndisponibilidad,
                promedioDiarioIndisponibilidadRedondeado: Math.round(promedioDiarioIndisponibilidad),
                descuentoCalculado,
                observacionDescuento: observacion,
                isCritical
            });
            setChartData(processedData);
        } catch (err) {
            setError('No se encontraron lecturas para este contrato');
            console.error('Error detallado:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitDescuento = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))?.id;
        if (!userId) {
            setError('Usuario no encontrado');
            return;
        }

        setSubmitting(true);
        try {
            const contratoId = searchMode === 'direct'
                ? selectedContrato.value
                : selectedContrato.id;

            const response = await submitDescuento(
                {
                    cod_contrato: parseInt(contratoId),
                    porcentaje: parseFloat(descuentoData.descuentoCalculado.toFixed(2)),
                    mes_descuento: selectedMonth.value,
                    cod_usuario: userId
                },
                selectedSucursal.descripcion
            );

            setSuccessMessage(response.message);
            setOpenConfirmDialog(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el descuento');
            console.error('Error detallado:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSearchModeChange = (_, newMode) => {
        if (newMode) {
            setSearchMode(newMode);
            setSelectedCliente(null);
            setClienteInput('');
            setSelectedContrato(null);
            setDescuentoData(null);
            setChartData([]);
        }
    };

    const handleClienteInputChange = (_, newValue) => {
        setClienteInput(newValue);
        if (selectedSucursal && newValue) {
            const token = localStorage.getItem('token');
            debouncedBuscarCliente(token, selectedSucursal.id_sucursal, newValue);
        }
    };

    const handleClienteChange = (_, value) => {
        setSelectedCliente(value);
        setSelectedContrato(null);
        setDescuentoData(null);
        setChartData([]);
    };

    const handleContratoChange = (_, value) => {
        const contratoValue = searchMode === 'direct'
            ? { value: value, label: value }
            : value;
        setSelectedContrato(contratoValue);
        setDescuentoData(null);
        setChartData([]);
    };

    const handleContratoInputChange = (_, newValue) => {
        if (searchMode === 'direct') {
            setSelectedContrato({ value: newValue, label: newValue });
        }
    };

    const handleMonthChange = (_, value) => {
        setSelectedMonth(value);
        setDescuentoData(null);
        setChartData([]);
    };

    const InfoCard = ({ title, value, color, infoText, observacion, isCritical, showSaveButton }) => (
        <Card sx={{ backgroundColor: color, height: '100%' }}>
            <CardContent sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    <Box>
                        {isCritical && (
                            <Tooltip title="Estado Crítico" arrow>
                                <IconButton size="small" color="error" sx={{ mr: 1 }}>
                                    <AlertTriangle size={16} />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title={infoText} arrow>
                            <IconButton size="small">
                                <Info size={16} />
                            </IconButton>
                        </Tooltip>
                        {showSaveButton && (
                            <Tooltip title="Generar Descuento" arrow>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => setOpenConfirmDialog(true)}
                                    sx={{ ml: 1 }}
                                >
                                    <Save size={16} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
                <Typography variant="h4" color="error" sx={{ flex: 1 }}>
                    {value}
                </Typography>
                {observacion && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {observacion}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Análisis de Indisponibilidad del Servicio
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Box sx={{ mb: 3 }}>
                        <ToggleButtonGroup
                            value={searchMode}
                            exclusive
                            onChange={handleSearchModeChange}
                            sx={{ mb: 2 }}
                        >
                            <ToggleButton value="complete">
                                Búsqueda por Cliente
                            </ToggleButton>
                            <ToggleButton value="direct">
                                Búsqueda por Contrato
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Grid container spacing={2} alignItems="center">
                            {searchMode === 'complete' ? (
                                <>
                                    {/*<Grid item xs={12} md={4}>*/}
                                    {/*    <Typography variant="subtitle1" gutterBottom>*/}
                                    {/*        Sucursal Seleccionada: {selectedSucursal?.descripcion || 'No seleccionada'}*/}
                                    {/*    </Typography>*/}
                                    {/*</Grid>*/}
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            options={clientes}
                                            getOptionLabel={(option) =>
                                                `${option.Nombre1} ${option.Apellido1}`.trim()
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Cliente"
                                                    required
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>


                                                                    {loading && <CircularProgress size={20} />}
                                                                {params.InputProps.endAdornment}
                                                                    </>
                                                                    ),
                                                                }}
                                                                />
                                                                    )}
                                                                onInputChange={handleClienteInputChange}
                                                                onChange={handleClienteChange}
                                                                value={selectedCliente}
                                                                disabled={!selectedSucursal}
                                                                />
                                                            </Grid>
                                                        <Grid item xs={12} md={4}>
                                                    <Autocomplete
                                                        options={contratos}
                                                        getOptionLabel={(option) => option.label || ''}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Número de Contrato"
                                                                required
                                                            />
                                                        )}
                                                        onChange={handleContratoChange}
                                                        value={selectedContrato}
                                                        disabled={!selectedCliente}
                                                    />
                                                </Grid>
                                                </>
                                                ) : (
                                                <>
                                                <Grid item xs={12} md={4}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Sucursal Seleccionada: {selectedSucursal?.descripcion || 'No seleccionada'}
                                            </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            freeSolo
                                            options={[]}
                                            value={selectedContrato}
                                            inputValue={selectedContrato?.value || ''}
                                            onInputChange={handleContratoInputChange}
                                            onChange={handleContratoChange}
                                            getOptionLabel={(option) => option?.value || option?.label || ''}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Número de Contrato"
                                                    required
                                                />
                                            )}
                                            disabled={!selectedSucursal}
                                        />
                                    </Grid>
                                </>
                            )}

                                <Grid item xs={12} md={4}>
                            <Autocomplete
                                options={AVAILABLE_MONTHS}
                                getOptionLabel={(option) => option.label || ''}
                                renderInput={(params) => (
                                    <TextField {...params} label="Mes" required />
                                )}
                                onChange={handleMonthChange}
                                value={selectedMonth}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={fetchDescuentoData}
                                disabled={!selectedSucursal || !selectedContrato || !selectedMonth || loading}
                                fullWidth
                            >
                                {loading ? <CircularProgress size={24} /> : 'Consultar Indisponibilidad'}
                            </Button>
                        </Grid>
                    </Grid>
        </Box>

    {descuentoData && (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <InfoCard
                        title="Promedio de Indisponibilidad"
                        value={`${descuentoData.promedioDiarioIndisponibilidadRedondeado}%`}
                        color="#fbe9e7"
                        infoText={`Valor sin redondear: ${descuentoData.promedioDiarioIndisponibilidad.toFixed(2)}%`}
                        isCritical={descuentoData.promedioDiarioIndisponibilidadRedondeado > 40}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <InfoCard
                        title="Descuento Aplicable"
                        value={`${descuentoData.descuentoCalculado}%`}
                        color="#e8f5e9"
                        infoText={`Basado en promedio de indisponibilidad redondeado de ${descuentoData.promedioDiarioIndisponibilidadRedondeado}%`}
                        observacion={descuentoData.observacionDescuento}
                        isCritical={descuentoData.isCritical}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            height: '100%',
                            cursor: !submitting ? 'pointer' : 'default',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: !submitting ? 'translateY(-2px)' : 'none',
                                boxShadow: !submitting ? 4 : 1
                            }
                        }}
                        onClick={() => !submitting && setOpenConfirmDialog(true)}
                    >
                        <CardContent sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}>
                            {submitting ? (
                                <CircularProgress size={30} sx={{ color: 'white' }} />
                            ) : (
                                <>
                                    <Save size={40} color="white" />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'white',
                                            mt: 2
                                        }}
                                    >
                                        Generar Descuento
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
                Indisponibilidad Diaria y Tendencia
            </Typography>
            <Box sx={{ height: 400, mb: 4 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="fecha"
                            angle={-45}
                            textAnchor="end"
                            height={70}
                        />
                        <YAxis
                            domain={[0, 100]}
                            label={{
                                value: 'Indisponibilidad (%)',
                                angle: -90,
                                position: 'insideLeft'
                            }}
                        />
                        <RechartsTooltip
                            formatter={(value, name) => [
                                `${value.toFixed(2)}%`,
                                name === 'indisponibilidad' ? 'Indisponibilidad' : 'Tendencia'
                            ]}
                            labelFormatter={(label) => {
                                const dataPoint = chartData.find(item => item.fecha === label);
                                return dataPoint ? dataPoint.fechaCompleta : label;
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="indisponibilidad"
                            stroke="#f44336"
                            name="Indisponibilidad"
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="tendencia"
                            stroke="#ff9800"
                            name="Tendencia"
                            dot={false}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Estadísticas Adicionales
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Días con Uso > 80%
                                </Typography>
                                <Typography variant="h5">
                                    {descuentoData.lecturas.filter(l =>
                                        100 - l.indisponibilidad > 80
                                    ).length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Días con Uso menor 50%
                                </Typography>
                                <Typography variant="h5">
                                    {descuentoData.lecturas.filter(l =>
                                        100 - l.indisponibilidad < 50
                                    ).length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Mejor Porcentaje de Uso
                                </Typography>
                                <Typography variant="h5">
                                    {(100 - Math.min(...descuentoData.lecturas.map(l => l.indisponibilidad))).toFixed(2)}%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Peor Porcentaje de Uso
                                </Typography>
                                <Typography variant="h5">
                                    {(100 - Math.max(...descuentoData.lecturas.map(l => l.indisponibilidad))).toFixed(2)}%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )}
</CardContent>
</Card>

    {/* Diálogo de Confirmación */}
    <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
    >
        <DialogTitle>Confirmar Descuento</DialogTitle>
        <DialogContent>
            <DialogContentText>
                ¿Está seguro que desea aplicar un descuento de {descuentoData?.descuentoCalculado}%
                para el contrato {selectedContrato?.id || selectedContrato?.value} en el mes de {selectedMonth?.label}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => setOpenConfirmDialog(false)}
                disabled={submitting}
            >
                Cancelar
            </Button>
            <Button
                onClick={handleSubmitDescuento}
                variant="contained"
                disabled={submitting}
            >
                {submitting ? <CircularProgress size={24} /> : 'Confirmar'}
            </Button>
        </DialogActions>
    </Dialog>

    {/* Snackbar de Error */}
    <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: '100%' }}
        >
            {error}
        </Alert>
    </Snackbar>

    {/* Snackbar de Éxito */}
    <Snackbar
        open={successMessage !== null}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert
            onClose={() => setSuccessMessage(null)}
            severity="success"
            sx={{ width: '100%' }}
        >
            {successMessage}
        </Alert>
    </Snackbar>
</Box>
);
}

export default Conexiones;