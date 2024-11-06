// // import React, { useState } from 'react';
// // import {
// //     Box,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     Typography,
// //     Button,
// //     IconButton,
// //     Chip,
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions,
// //     TextField,
// //     MenuItem,
// //     Grid
// // } from '@mui/material';
// //
// // import {
// //     Add,
// //     Close,
// //     Notes,
// // } from '@mui/icons-material';
// //
// // const Orders = () => {
// //     const [orders, setOrders] = useState([
// //         {
// //             id: 'OT-001',
// //             clientName: 'Juan Pérez',
// //             service: 'Instalación Internet',
// //             address: 'Av. Principal 123',
// //             status: 'pendiente',
// //             priority: 'alta',
// //             scheduledDate: '2024-10-23',
// //             technician: '',
// //             phone: '0987654321'
// //         },
// //         {
// //             id: 'OT-002',
// //             clientName: 'María López',
// //             service: 'Reparación TV',
// //             address: 'Calle 5ta 234',
// //             status: 'en_proceso',
// //             priority: 'media',
// //             scheduledDate: '2024-10-23',
// //             technician: 'Carlos Ruiz',
// //             phone: '0998765432'
// //         }
// //     ]);
// //
// //     const [technicians] = useState([
// //         { id: 1, name: 'Carlos Ruiz', specialty: 'Internet' },
// //         { id: 2, name: 'Ana Mora', specialty: 'TV' },
// //         { id: 3, name: 'Pedro Silva', specialty: 'Fibra' }
// //     ]);
// //
// //     const [selectedOrder, setSelectedOrder] = useState(null);
// //     const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
// //
// //     const getStatusChip = (status) => {
// //         const statusConfig = {
// //             pendiente: { color: 'warning', label: 'Pendiente' },
// //             en_proceso: { color: 'info', label: 'En Proceso' },
// //             completado: { color: 'success', label: 'Completado' },
// //             cancelado: { color: 'error', label: 'Cancelado' }
// //         };
// //
// //         const config = statusConfig[status] || statusConfig.pendiente;
// //         return <Chip label={config.label} color={config.color} size="small" />;
// //     };
// //
// //     const handleEditOrder = (order) => {
// //         setSelectedOrder(order);
// //         setIsOrderDialogOpen(true);
// //     };
// //
// //     const handleSaveOrder = (event) => {
// //         event.preventDefault();
// //         if (selectedOrder) {
// //             const updatedOrders = orders.map(order =>
// //                 order.id === selectedOrder.id ? selectedOrder : order
// //             );
// //             setOrders(updatedOrders);
// //         } else {
// //             // Es una nueva orden
// //             const newOrder = {
// //                 ...selectedOrder,
// //                 id: `OT-${String(orders.length + 1).padStart(3, '0')}`
// //             };
// //             setOrders([...orders, newOrder]);
// //         }
// //         setIsOrderDialogOpen(false);
// //         setSelectedOrder(null);
// //     };
// //
// //     return (
// //         <Box>
// //             {/* Orders Header */}
// //             <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                 <Typography variant="h5" component="h2">
// //                     Órdenes de Trabajo
// //                 </Typography>
// //                 <Button
// //                     variant="contained"
// //                     startIcon={<Add />}
// //                     onClick={() => {
// //                         setSelectedOrder({
// //                             status: 'pendiente',
// //                             priority: 'media'
// //                         });
// //                         setIsOrderDialogOpen(true);
// //                     }}
// //                 >
// //                     Nueva Orden
// //                 </Button>
// //             </Box>
// //
// //             {/* Orders Table */}
// //             <TableContainer component={Paper}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>ID</TableCell>
// //                             <TableCell>Cliente</TableCell>
// //                             <TableCell>Servicio</TableCell>
// //                             <TableCell>Estado</TableCell>
// //                             <TableCell>Fecha</TableCell>
// //                             <TableCell>Técnico</TableCell>
// //                             <TableCell>Acciones</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {orders.map((order) => (
// //                             <TableRow key={order.id}>
// //                                 <TableCell>{order.id}</TableCell>
// //                                 <TableCell>{order.clientName}</TableCell>
// //                                 <TableCell>{order.service}</TableCell>
// //                                 <TableCell>{getStatusChip(order.status)}</TableCell>
// //                                 <TableCell>{order.scheduledDate}</TableCell>
// //                                 <TableCell>{order.technician || '-'}</TableCell>
// //                                 <TableCell>
// //                                     <IconButton
// //                                         size="small"
// //                                         onClick={() => handleEditOrder(order)}
// //                                     >
// //                                         <Notes fontSize="small" />
// //                                     </IconButton>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //
// //             {/* Order Dialog */}
// //             <Dialog
// //                 open={isOrderDialogOpen}
// //                 onClose={() => setIsOrderDialogOpen(false)}
// //                 maxWidth="md"
// //                 fullWidth
// //             >
// //                 <form onSubmit={handleSaveOrder}>
// //                     <DialogTitle>
// //                         {selectedOrder?.id ? `Orden ${selectedOrder.id}` : 'Nueva Orden'}
// //                         <IconButton
// //                             aria-label="close"
// //                             onClick={() => setIsOrderDialogOpen(false)}
// //                             sx={{ position: 'absolute', right: 8, top: 8 }}
// //                         >
// //                             <Close />
// //                         </IconButton>
// //                     </DialogTitle>
// //                     <DialogContent dividers>
// //                         <Grid container spacing={3}>
// //                             <Grid item xs={12} md={6}>
// //                                 <TextField
// //                                     label="Cliente"
// //                                     fullWidth
// //                                     required
// //                                     value={selectedOrder?.clientName || ''}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         clientName: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} md={6}>
// //                                 <TextField
// //                                     label="Teléfono"
// //                                     fullWidth
// //                                     required
// //                                     value={selectedOrder?.phone || ''}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         phone: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                 />
// //                             </Grid>
// //                             {/* ... resto de los campos del formulario ... */}
// //                             <Grid item xs={12}>
// //                                 <TextField
// //                                     label="Dirección"
// //                                     fullWidth
// //                                     required
// //                                     value={selectedOrder?.address || ''}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         address: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} md={6}>
// //                                 <TextField
// //                                     select
// //                                     label="Estado"
// //                                     fullWidth
// //                                     value={selectedOrder?.status || 'pendiente'}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         status: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                 >
// //                                     <MenuItem value="pendiente">Pendiente</MenuItem>
// //                                     <MenuItem value="en_proceso">En Proceso</MenuItem>
// //                                     <MenuItem value="completado">Completado</MenuItem>
// //                                     <MenuItem value="cancelado">Cancelado</MenuItem>
// //                                 </TextField>
// //                             </Grid>
// //                             <Grid item xs={12} md={6}>
// //                                 <TextField
// //                                     select
// //                                     label="Técnico"
// //                                     fullWidth
// //                                     value={selectedOrder?.technician || ''}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         technician: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                 >
// //                                     <MenuItem value="">Sin asignar</MenuItem>
// //                                     {technicians.map((tech) => (
// //                                         <MenuItem key={tech.id} value={tech.name}>
// //                                             {tech.name} - {tech.specialty}
// //                                         </MenuItem>
// //                                     ))}
// //                                 </TextField>
// //                             </Grid>
// //                             <Grid item xs={12} md={6}>
// //                                 <TextField
// //                                     label="Fecha"
// //                                     type="date"
// //                                     fullWidth
// //                                     required
// //                                     value={selectedOrder?.scheduledDate || ''}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         scheduledDate: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                     InputLabelProps={{ shrink: true }}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12}>
// //                                 <TextField
// //                                     label="Servicio/Descripción"
// //                                     fullWidth
// //                                     multiline
// //                                     rows={4}
// //                                     value={selectedOrder?.service || ''}
// //                                     onChange={(e) => setSelectedOrder({
// //                                         ...selectedOrder,
// //                                         service: e.target.value
// //                                     })}
// //                                     margin="normal"
// //                                 />
// //                             </Grid>
// //                         </Grid>
// //                     </DialogContent>
// //                     <DialogActions>
// //                         <Button onClick={() => setIsOrderDialogOpen(false)}>Cancelar</Button>
// //                         <Button type="submit" variant="contained">
// //                             Guardar
// //                         </Button>
// //                     </DialogActions>
// //                 </form>
// //             </Dialog>
// //         </Box>
// //     );
// // };
// //
// // export default Orders;
//
//
// import React, { useState } from 'react';
// import {
//     Box,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TablePagination,
//     Button,
//     TextField,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     IconButton,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Typography,
//     Toolbar,
// } from '@mui/material';
// import {
//     Add as AddIcon,
//     Search as SearchIcon,
//     FilterList as FilterListIcon,
//     Clear as ClearIcon,
// } from '@mui/icons-material';
//
// const Orders = () => {
//     // Estados para el manejo de la tabla
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [openNewOrder, setOpenNewOrder] = useState(false);
//     const [openFilters, setOpenFilters] = useState(false);
//
//     // Estados para los filtros
//     const [filters, setFilters] = useState({
//         codigo: '',
//         cliente: '',
//         estado: '',
//         sector: '',
//         fechaDesde: '',
//         fechaHasta: '',
//     });
//
//     // Estado para nueva orden
//     const [newOrder, setNewOrder] = useState({
//         codigo: '',
//         cliente: '',
//         orden: '',
//         fechaEmision: '',
//         sector: '',
//         motivo: '',
//         comentarios: '',
//         estado: '',
//     });
//
//     // Datos de ejemplo para los selects
//     const sectores = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
//     const estados = ['Pendiente', 'En Proceso', 'Completada', 'Cancelada'];
//     const motivos = ['Instalación', 'Reparación', 'Mantenimiento', 'Revisión'];
//
//     // Manejadores
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//
//     const handleOpenNewOrder = () => {
//         setOpenNewOrder(true);
//     };
//
//     const handleCloseNewOrder = () => {
//         setOpenNewOrder(false);
//         setNewOrder({
//             codigo: '',
//             cliente: '',
//             orden: '',
//             fechaEmision: '',
//             sector: '',
//             motivo: '',
//             comentarios: '',
//             estado: '',
//         });
//     };
//
//     const handleNewOrderChange = (event) => {
//         setNewOrder({
//             ...newOrder,
//             [event.target.name]: event.target.value
//         });
//     };
//
//     const handleFilterChange = (event) => {
//         setFilters({
//             ...filters,
//             [event.target.name]: event.target.value
//         });
//     };
//
//     const clearFilters = () => {
//         setFilters({
//             codigo: '',
//             cliente: '',
//             estado: '',
//             sector: '',
//             fechaDesde: '',
//             fechaHasta: '',
//         });
//     };
//
//     return (
//         <Box sx={{ p: 3 }}>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Órdenes de Trabajo
//                 </Typography>
//                 <Button
//                     variant="contained"
//                     startIcon={<AddIcon />}
//                     onClick={handleOpenNewOrder}
//                 >
//                     Nueva Orden
//                 </Button>
//             </Box>
//
//             {/* Filtros */}
//             <Paper sx={{ mb: 2, p: 2 }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={6} md={2}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             label="Código"
//                             name="codigo"
//                             value={filters.codigo}
//                             onChange={handleFilterChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             label="Cliente"
//                             name="cliente"
//                             value={filters.cliente}
//                             onChange={handleFilterChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <FormControl fullWidth size="small">
//                             <InputLabel>Estado</InputLabel>
//                             <Select
//                                 name="estado"
//                                 value={filters.estado}
//                                 label="Estado"
//                                 onChange={handleFilterChange}
//                             >
//                                 <MenuItem value="">Todos</MenuItem>
//                                 {estados.map((estado) => (
//                                     <MenuItem key={estado} value={estado}>
//                                         {estado}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <FormControl fullWidth size="small">
//                             <InputLabel>Sector</InputLabel>
//                             <Select
//                                 name="sector"
//                                 value={filters.sector}
//                                 label="Sector"
//                                 onChange={handleFilterChange}
//                             >
//                                 <MenuItem value="">Todos</MenuItem>
//                                 {sectores.map((sector) => (
//                                     <MenuItem key={sector} value={sector}>
//                                         {sector}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             label="Fecha Desde"
//                             type="date"
//                             name="fechaDesde"
//                             value={filters.fechaDesde}
//                             onChange={handleFilterChange}
//                             InputLabelProps={{ shrink: true }}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             label="Fecha Hasta"
//                             type="date"
//                             name="fechaHasta"
//                             value={filters.fechaHasta}
//                             onChange={handleFilterChange}
//                             InputLabelProps={{ shrink: true }}
//                         />
//                     </Grid>
//                 </Grid>
//                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button
//                         variant="outlined"
//                         startIcon={<ClearIcon />}
//                         onClick={clearFilters}
//                         sx={{ mr: 1 }}
//                     >
//                         Limpiar
//                     </Button>
//                     <Button
//                         variant="contained"
//                         startIcon={<SearchIcon />}
//                     >
//                         Buscar
//                     </Button>
//                 </Box>
//             </Paper>
//
//             {/* Tabla */}
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="tabla de órdenes">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Código</TableCell>
//                             <TableCell>Cliente</TableCell>
//                             <TableCell>Orden</TableCell>
//                             <TableCell>F. Emisión</TableCell>
//                             <TableCell>Sector</TableCell>
//                             <TableCell>Motivo</TableCell>
//                             <TableCell>Comentarios</TableCell>
//                             <TableCell>Estado</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell colSpan={8} align="center">
//                                 No hay datos disponibles
//                             </TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={0}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     labelRowsPerPage="Filas por página"
//                     labelDisplayedRows={({ from, to, count }) =>
//                         `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
//                     }
//                 />
//             </TableContainer>
//
//             {/* Modal Nueva Orden */}
//             <Dialog open={openNewOrder} onClose={handleCloseNewOrder} maxWidth="md" fullWidth>
//                 <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Código"
//                                 name="codigo"
//                                 value={newOrder.codigo}
//                                 onChange={handleNewOrderChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Cliente"
//                                 name="cliente"
//                                 value={newOrder.cliente}
//                                 onChange={handleNewOrderChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Orden"
//                                 name="orden"
//                                 value={newOrder.orden}
//                                 onChange={handleNewOrderChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Fecha de Emisión"
//                                 type="date"
//                                 name="fechaEmision"
//                                 value={newOrder.fechaEmision}
//                                 onChange={handleNewOrderChange}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl fullWidth>
//                                 <InputLabel>Sector</InputLabel>
//                                 <Select
//                                     name="sector"
//                                     value={newOrder.sector}
//                                     label="Sector"
//                                     onChange={handleNewOrderChange}
//                                 >
//                                     {sectores.map((sector) => (
//                                         <MenuItem key={sector} value={sector}>
//                                             {sector}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl fullWidth>
//                                 <InputLabel>Motivo</InputLabel>
//                                 <Select
//                                     name="motivo"
//                                     value={newOrder.motivo}
//                                     label="Motivo"
//                                     onChange={handleNewOrderChange}
//                                 >
//                                     {motivos.map((motivo) => (
//                                         <MenuItem key={motivo} value={motivo}>
//                                             {motivo}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Comentarios"
//                                 name="comentarios"
//                                 value={newOrder.comentarios}
//                                 onChange={handleNewOrderChange}
//                                 multiline
//                                 rows={4}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <InputLabel>Estado</InputLabel>
//                                 <Select
//                                     name="estado"
//                                     value={newOrder.estado}
//                                     label="Estado"
//                                     onChange={handleNewOrderChange}
//                                 >
//                                     {estados.map((estado) => (
//                                         <MenuItem key={estado} value={estado}>
//                                             {estado}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseNewOrder}>Cancelar</Button>
//                     <Button variant="contained" onClick={handleCloseNewOrder}>
//                         Guardar
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };
//
// export default Orders;

// pages/Orders.js
import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Tooltip,
    CircularProgress,
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Clear as ClearIcon,
    Refresh as RefreshIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import AddOrderForm from '../components/AddOrderForm';
import {
    getSucursales,
    getOrdenesBySucursal
} from '../services/ClientService';
import { useNavigate } from 'react-router-dom';





// En Orders.js, reemplaza la importación de date-fns por:
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);
    const [openAddOrder, setOpenAddOrder] = useState(false);
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState('');

    // Estados para filtros
    const [filters, setFilters] = useState({
        codigo: '',
        cliente: '',
        fechaDesde: '',
        fechaHasta: '',
        estado: '',
        sector: ''
    });

    const estadosOrden = [
        { value: 'pendiente', label: 'Pendiente', color: 'warning' },
        { value: 'en_proceso', label: 'En Proceso', color: 'info' },
        { value: 'completada', label: 'Completada', color: 'success' },
        { value: 'cancelada', label: 'Cancelada', color: 'error' }
    ];

    const sectores = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];

    useEffect(() => {
        loadSucursales();
    }, []);

    useEffect(() => {
        if (selectedSucursal) {
            loadOrders();
        }
    }, [selectedSucursal, page, rowsPerPage, filters]);

    const loadSucursales = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const sucursalesData = await getSucursales(token);
            setSucursales(Array.isArray(sucursalesData) ? sucursalesData : []);
        } catch (error) {
            console.error('Error al cargar sucursales:', error);
            setError('Error al cargar las sucursales. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const loadOrders = async () => {
        if (!selectedSucursal) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const params = {
                page: page + 1,
                limit: rowsPerPage,
                ...filters
            };

            const response = await getOrdenesBySucursal(token, selectedSucursal, params);
            setOrders(response.orders || []);
            setTotalOrders(response.total || 0);
        } catch (error) {
            console.error('Error al cargar órdenes:', error);
            setError('Error al cargar las órdenes. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setPage(0);
    };

    const clearFilters = () => {
        setFilters({
            codigo: '',
            cliente: '',
            fechaDesde: '',
            fechaHasta: '',
            estado: '',
            sector: ''
        });
        setPage(0);
    };

    const handleOpenAddOrder = () => {
        setOpenAddOrder(true);
    };

    const handleCloseAddOrder = () => {
        setOpenAddOrder(false);
    };

    const handleOrderCreated = () => {
        loadOrders();
        setOpenAddOrder(false);
    };

    const formatDateTime = (date) => {
        try {
            return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: es });
        } catch (error) {
            return 'Fecha inválida';
        }
    };

    const handleViewOrder = (orderId) => {
        navigate(`/orders/${orderId}`);
    };

    const handleEditOrder = (orderId) => {
        navigate(`/orders/${orderId}/edit`);
    };

    return (
        <Box sx={{ padding: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Órdenes de Trabajo
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddOrder}
                    disabled={!selectedSucursal}
                >
                    Nueva Orden
                </Button>
            </Box>

            {/* Selección de Sucursal */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>Sucursal</InputLabel>
                    <Select
                        value={selectedSucursal}
                        label="Sucursal"
                        onChange={(e) => setSelectedSucursal(e.target.value)}
                    >
                        {sucursales.map((sucursal) => (
                            <MenuItem key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
                                {sucursal.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
                            value={filters.codigo}
                            onChange={handleFilterChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            label="Cliente"
                            name="cliente"
                            value={filters.cliente}
                            onChange={handleFilterChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            label="Fecha Desde"
                            type="date"
                            name="fechaDesde"
                            value={filters.fechaDesde}
                            onChange={handleFilterChange}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            fullWidth
                            label="Fecha Hasta"
                            type="date"
                            name="fechaHasta"
                            value={filters.fechaHasta}
                            onChange={handleFilterChange}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filters.estado}
                                label="Estado"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">Todos</MenuItem>
                                {estadosOrden.map((estado) => (
                                    <MenuItem key={estado.value} value={estado.value}>
                                        {estado.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Sector</InputLabel>
                            <Select
                                name="sector"
                                value={filters.sector}
                                label="Sector"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">Todos</MenuItem>
                                {sectores.map((sector) => (
                                    <MenuItem key={sector} value={sector}>
                                        {sector}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={clearFilters}
                    >
                        Limpiar
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={() => loadOrders()}
                        disabled={!selectedSucursal}
                    >
                        Buscar
                    </Button>
                </Box>
            </Paper>

            {/* Tabla de Órdenes */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Orden</TableCell>
                                <TableCell>F. Emisión</TableCell>
                                <TableCell>Sector</TableCell>
                                <TableCell>Motivo</TableCell>
                                <TableCell>Comentarios</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ color: 'error.main' }}>
                                        {error}
                                    </TableCell>
                                </TableRow>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.codigo}</TableCell>
                                        <TableCell>{order.cliente}</TableCell>
                                        <TableCell>{order.tipo_orden}</TableCell>
                                        <TableCell>{formatDateTime(order.fecha_emision)}</TableCell>
                                        <TableCell>{order.sector}</TableCell>
                                        <TableCell>{order.motivo}</TableCell>
                                        <TableCell>{order.descripcion}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={estadosOrden.find(e => e.value === order.estado)?.label}
                                                color={estadosOrden.find(e => e.value === order.estado)?.color}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Ver Detalles">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleViewOrder(order.id)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Editar">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditOrder(order.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        No hay órdenes disponibles
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={totalOrders}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                    }
                />
            </Paper>

            {/* Modal de Nueva Orden */}
            <AddOrderForm
                open={openAddOrder}
                onClose={handleCloseAddOrder}
                onOrderCreated={handleOrderCreated}
                sucursalId={selectedSucursal}
            />
        </Box>
    );
};

export default Orders;