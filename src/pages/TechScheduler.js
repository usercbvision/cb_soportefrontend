import React, { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid
} from '@mui/material';

import {
    Assignment,
    Person,
    Schedule,
    Add,
    Close,
    Engineering,
    Notes,
    ArrowDropDown
} from '@mui/icons-material';

const drawerWidth = 240;

const TechScheduler = () => {
    const [orders, setOrders] = useState([
        {
            id: 'OT-001',
            clientName: 'Juan Pérez',
            service: 'Instalación Internet',
            address: 'Av. Principal 123',
            status: 'pendiente',
            priority: 'alta',
            scheduledDate: '2024-10-23',
            technician: '',
            phone: '0987654321'
        },
        {
            id: 'OT-002',
            clientName: 'María López',
            service: 'Reparación TV',
            address: 'Calle 5ta 234',
            status: 'en_proceso',
            priority: 'media',
            scheduledDate: '2024-10-23',
            technician: 'Carlos Ruiz',
            phone: '0998765432'
        }
    ]);

    const [technicians] = useState([
        { id: 1, name: 'Carlos Ruiz', specialty: 'Internet' },
        { id: 2, name: 'Ana Mora', specialty: 'TV' },
        { id: 3, name: 'Pedro Silva', specialty: 'Fibra' }
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

    const getStatusChip = (status) => {
        const statusConfig = {
            pendiente: { color: 'warning', label: 'Pendiente' },
            en_proceso: { color: 'info', label: 'En Proceso' },
            completado: { color: 'success', label: 'Completado' },
            cancelado: { color: 'error', label: 'Cancelado' }
        };

        const config = statusConfig[status] || statusConfig.pendiente;

        return <Chip label={config.label} color={config.color} size="small" />;
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsOrderDialogOpen(true);
    };

    const handleSaveOrder = (event) => {
        event.preventDefault();
        if (selectedOrder) {
            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? selectedOrder : order
            );
            setOrders(updatedOrders);
        }
        setIsOrderDialogOpen(false);
        setSelectedOrder(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* AppBar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Sistema de Agendamiento Técnico
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button selected>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary="Órdenes" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Engineering />
                            </ListItemIcon>
                            <ListItemText primary="Técnicos" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />

                {/* Orders Table */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="h2">
                        Órdenes de Trabajo
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => {
                            setSelectedOrder({
                                id: `OT-${orders.length + 1}`,
                                status: 'pendiente',
                                priority: 'media'
                            });
                            setIsOrderDialogOpen(true);
                        }}
                    >
                        Nueva Orden
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Servicio</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Técnico</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.clientName}</TableCell>
                                    <TableCell>{order.service}</TableCell>
                                    <TableCell>{getStatusChip(order.status)}</TableCell>
                                    <TableCell>{order.scheduledDate}</TableCell>
                                    <TableCell>{order.technician || '-'}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditOrder(order)}
                                        >
                                            <Notes fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Order Dialog */}
                <Dialog
                    open={isOrderDialogOpen}
                    onClose={() => setIsOrderDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <form onSubmit={handleSaveOrder}>
                        <DialogTitle>
                            {selectedOrder?.id ? `Orden ${selectedOrder.id}` : 'Nueva Orden'}
                            <IconButton
                                aria-label="close"
                                onClick={() => setIsOrderDialogOpen(false)}
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <Close />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Cliente"
                                        fullWidth
                                        required
                                        value={selectedOrder?.clientName || ''}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            clientName: e.target.value
                                        })}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Teléfono"
                                        fullWidth
                                        required
                                        value={selectedOrder?.phone || ''}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            phone: e.target.value
                                        })}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Dirección"
                                        fullWidth
                                        required
                                        value={selectedOrder?.address || ''}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            address: e.target.value
                                        })}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="Estado"
                                        fullWidth
                                        value={selectedOrder?.status || 'pendiente'}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            status: e.target.value
                                        })}
                                        margin="normal"
                                    >
                                        <MenuItem value="pendiente">Pendiente</MenuItem>
                                        <MenuItem value="en_proceso">En Proceso</MenuItem>
                                        <MenuItem value="completado">Completado</MenuItem>
                                        <MenuItem value="cancelado">Cancelado</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="Técnico"
                                        fullWidth
                                        value={selectedOrder?.technician || ''}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            technician: e.target.value
                                        })}
                                        margin="normal"
                                    >
                                        <MenuItem value="">Sin asignar</MenuItem>
                                        {technicians.map((tech) => (
                                            <MenuItem key={tech.id} value={tech.name}>
                                                {tech.name} - {tech.specialty}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Fecha"
                                        type="date"
                                        fullWidth
                                        required
                                        value={selectedOrder?.scheduledDate || ''}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            scheduledDate: e.target.value
                                        })}
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Servicio/Descripción"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={selectedOrder?.service || ''}
                                        onChange={(e) => setSelectedOrder({
                                            ...selectedOrder,
                                            service: e.target.value
                                        })}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsOrderDialogOpen(false)}>Cancelar</Button>
                            <Button type="submit" variant="contained">
                                Guardar
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </Box>
    );
};

export default TechScheduler;