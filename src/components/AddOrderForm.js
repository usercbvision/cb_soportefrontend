// // // components/AddOrderForm.js
// // import React, { useState, useCallback, useEffect } from 'react';
// // import {
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions,
// //     Button,
// //     Grid,
// //     TextField,
// //     FormControl,
// //     InputLabel,
// //     Select,
// //     MenuItem,
// //     Typography,
// //     Alert,
// //     Autocomplete,
// //     Box,
// //     CircularProgress,
// //     Checkbox,
// //     FormControlLabel
// // } from '@mui/material';
// // import { ClientService } from '../services/ClientService';
// //
// // const AddOrderForm = ({ open, onClose, onOrderCreated, sucursalId }) => {
// //     // Estados para el formulario
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [clientes, setClientes] = useState([]);
// //     const [searchingClientes, setSearchingClientes] = useState(false);
// //     const [selectedCliente, setSelectedCliente] = useState(null);
// //     const [contratoEstado, setContratoEstado] = useState(null);
// //
// //     // Estado del formulario
// //     const [formData, setFormData] = useState({
// //         cliente_id: '',
// //         contrato_id: '',
// //         tipo_orden: '',
// //         sector: '',
// //         motivo: '',
// //         descripcion: '',
// //         fecha_programada: '',
// //         hora_programada: '',
// //         prioridad: 'normal'
// //     });
// //
// //     // Datos para selects
// //     const tiposOrden = [
// //         { id: 'instalacion', nombre: 'Instalación' },
// //         { id: 'mantenimiento', nombre: 'Mantenimiento' },
// //         { id: 'reparacion', nombre: 'Reparación' },
// //         { id: 'desinstalacion', nombre: 'Desinstalación' }
// //     ];
// //
// //     const sectores = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
// //
// //
// //
// //
// //
// //
// //
// //     // components/AddOrderForm.js (continuación)
// //
// //     const motivos = {
// //         instalacion: ['Nueva Instalación', 'Reinstalación', 'Ampliación'],
// //         mantenimiento: ['Preventivo', 'Correctivo', 'Actualización'],
// //         reparacion: ['Falla de Equipo', 'Problemas de Conexión', 'Daño Físico'],
// //         desinstalacion: ['Cancelación de Servicio', 'Cambio de Domicilio', 'Temporal']
// //     };
// //
// //     const prioridades = [
// //         { value: 'baja', label: 'Baja' },
// //         { value: 'normal', label: 'Normal' },
// //         { value: 'alta', label: 'Alta' },
// //         { value: 'urgente', label: 'Urgente' }
// //     ];
// //
// //     // Estado para cliente no definido
// //     const [sinClienteDefinido, setSinClienteDefinido] = useState(false);
// //
// //     useEffect(() => {
// //         if (!open) {
// //             resetForm();
// //         }
// //     }, [open]);
// //
// //     const resetForm = () => {
// //         setFormData({
// //             cliente_id: '',
// //             contrato_id: '',
// //             tipo_orden: '',
// //             sector: '',
// //             motivo: '',
// //             descripcion: '',
// //             fecha_programada: '',
// //             hora_programada: '',
// //             prioridad: 'normal'
// //         });
// //         setSelectedCliente(null);
// //         setContratoEstado(null);
// //         setSinClienteDefinido(false);
// //         setError(null);
// //     };
// //
// //     // Búsqueda de clientes
// //     const handleClienteSearch = async (searchTerm) => {
// //         if (!searchTerm || searchTerm.length < 3 || !sucursalId) return;
// //
// //         setSearchingClientes(true);
// //         try {
// //             const result = await ClientService.buscarCliente(sucursalId, searchTerm);
// //             if (result.success) {
// //                 setClientes(result.data);
// //             } else {
// //                 setError(result.message);
// //             }
// //         } catch (error) {
// //             setError('Error al buscar clientes');
// //         } finally {
// //             setSearchingClientes(false);
// //         }
// //     };
// //
// //     // Manejo de cambios en el cliente
// //     const handleClienteChange = async (event, value) => {
// //         setSelectedCliente(value);
// //         if (value) {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 cliente_id: value.id,
// //                 contrato_id: value.contratos?.length === 1 ? value.contratos[0] : ''
// //             }));
// //
// //             if (value.contratos?.length === 1) {
// //                 const contratoResult = await ClientService.getEstadoContrato(sucursalId, value.contratos[0]);
// //                 if (contratoResult.success) {
// //                     setContratoEstado(contratoResult.data);
// //                 }
// //             }
// //         } else {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 cliente_id: '',
// //                 contrato_id: ''
// //             }));
// //             setContratoEstado(null);
// //         }
// //     };
// //
// //     const handleSinClienteDefinidoChange = (event) => {
// //         setSinClienteDefinido(event.target.checked);
// //         if (event.target.checked) {
// //             setSelectedCliente(null);
// //             setFormData(prev => ({
// //                 ...prev,
// //                 cliente_id: '',
// //                 contrato_id: '',
// //                 cliente_nombre: '',
// //                 cliente_contacto: ''
// //             }));
// //             setContratoEstado(null);
// //         }
// //     };
// //
// //     // Manejo de cambios en el formulario
// //     const handleChange = (event) => {
// //         const { name, value } = event.target;
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: value
// //         }));
// //     };
// //
// //     // Validación del formulario
// //     const isFormValid = () => {
// //         if (!sinClienteDefinido) {
// //             if (!formData.cliente_id || !formData.contrato_id) return false;
// //         }
// //         return (
// //             formData.tipo_orden &&
// //             formData.sector &&
// //             formData.motivo &&
// //             formData.descripcion &&
// //             formData.fecha_programada &&
// //             formData.hora_programada
// //         );
// //     };
// //
// //     // Envío del formulario
// //     const handleSubmit = async () => {
// //         if (!isFormValid()) {
// //             setError('Por favor, complete todos los campos requeridos');
// //             return;
// //         }
// //
// //         setLoading(true);
// //         try {
// //             // Aquí irá la llamada a tu API cuando esté implementada
// //             const orderData = {
// //                 ...formData,
// //                 sucursal_id: sucursalId,
// //                 sin_cliente: sinClienteDefinido
// //             };
// //
// //             // Simular llamada a API
// //             await new Promise(resolve => setTimeout(resolve, 1000));
// //
// //             onOrderCreated();
// //             onClose();
// //         } catch (error) {
// //             setError('Error al crear la orden de trabajo');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     return (
// //         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// //             <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
// //             <DialogContent>
// //                 <Grid container spacing={2} sx={{ mt: 1 }}>
// //                     {/* Checkbox para cliente no definido */}
// //                     <Grid item xs={12}>
// //                         <FormControlLabel
// //                             control={
// //                                 <Checkbox
// //                                     checked={sinClienteDefinido}
// //                                     onChange={handleSinClienteDefinidoChange}
// //                                 />
// //                             }
// //                             label="No tengo cliente definido"
// //                         />
// //                     </Grid>
// //
// //                     {/* Sección de cliente */}
// //                     {!sinClienteDefinido && (
// //                         <>
// //                             <Grid item xs={12}>
// //                                 <Autocomplete
// //                                     options={clientes}
// //                                     getOptionLabel={(option) => option.nombreCompleto}
// //                                     loading={searchingClientes}
// //                                     value={selectedCliente}
// //                                     onChange={handleClienteChange}
// //                                     onInputChange={(event, value) => handleClienteSearch(value)}
// //                                     renderInput={(params) => (
// //                                         <TextField
// //                                             {...params}
// //                                             label="Cliente"
// //                                             required
// //                                             InputProps={{
// //                                                 ...params.InputProps,
// //                                                 endAdornment: (
// //                                                     <>
// //                                                         {searchingClientes ? <CircularProgress color="inherit" size={20} /> : null}
// //                                                         {params.InputProps.endAdornment}
// //                                                     </>
// //                                                 ),
// //                                             }}
// //                                         />
// //                                     )}
// //                                 />
// //                             </Grid>
// //
// //                             {selectedCliente && (
// //                                 <Grid item xs={12}>
// //                                     <FormControl fullWidth>
// //                                         <InputLabel>Contrato</InputLabel>
// //                                         <Select
// //                                             name="contrato_id"
// //                                             value={formData.contrato_id}
// //                                             onChange={handleChange}
// //                                             required
// //                                         >
// //                                             {selectedCliente.contratos?.map((contrato) => (
// //                                                 <MenuItem key={contrato} value={contrato}>
// //                                                     {contrato}
// //                                                 </MenuItem>
// //                                             ))}
// //                                         </Select>
// //                                     </FormControl>
// //                                 </Grid>
// //                             )}
// //
// //                             {contratoEstado && (
// //                                 <Grid item xs={12}>
// //                                     <Alert
// //                                         severity={contratoEstado.estadoActual.estado === 'Activo' ? 'success' : 'error'}
// //                                     >
// //                                         Estado del contrato: {contratoEstado.estadoActual.estado}
// //                                     </Alert>
// //                                 </Grid>
// //                             )}
// //                         </>
// //                     )}
// //
// //                     {/* Campos específicos para cliente no definido */}
// //                     {sinClienteDefinido && (
// //                         <>
// //                             <Grid item xs={12} sm={6}>
// //                                 <TextField
// //                                     fullWidth
// //                                     label="Nombre del cliente"
// //                                     name="cliente_nombre"
// //                                     value={formData.cliente_nombre || ''}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} sm={6}>
// //                                 <TextField
// //                                     fullWidth
// //                                     label="Contacto"
// //                                     name="cliente_contacto"
// //                                     value={formData.cliente_contacto || ''}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                             </Grid>
// //                         </>
// //                     )}
// //
// //                     {/* Campos comunes */}
// //                     <Grid item xs={12} sm={6}>
// //                         <FormControl fullWidth required>
// //                             <InputLabel>Tipo de Orden</InputLabel>
// //                             <Select
// //                                 name="tipo_orden"
// //                                 value={formData.tipo_orden}
// //                                 onChange={handleChange}
// //                             >
// //                                 {tiposOrden.map((tipo) => (
// //                                     <MenuItem key={tipo.id} value={tipo.id}>
// //                                         {tipo.nombre}
// //                                     </MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                     </Grid>
// //
// //                     <Grid item xs={12} sm={6}>
// //                         <FormControl fullWidth required>
// //                             <InputLabel>Sector</InputLabel>
// //                             <Select
// //                                 name="sector"
// //                                 value={formData.sector}
// //                                 onChange={handleChange}
// //                             >
// //                                 {sectores.map((sector) => (
// //                                     <MenuItem key={sector} value={sector}>
// //                                         {sector}
// //                                     </MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                     </Grid>
// //
// //                     <Grid item xs={12} sm={6}>
// //                         <FormControl fullWidth required>
// //                             <InputLabel>Motivo</InputLabel>
// //                             <Select
// //                                 name="motivo"
// //                                 value={formData.motivo}
// //                                 onChange={handleChange}
// //                                 disabled={!formData.tipo_orden}
// //                             >
// //                                 {formData.tipo_orden && motivos[formData.tipo_orden]?.map((motivo) => (
// //                                     <MenuItem key={motivo} value={motivo}>
// //                                         {motivo}
// //                                     </MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                     </Grid>
// //
// //                     <Grid item xs={12} sm={6}>
// //                         <FormControl fullWidth required>
// //                             <InputLabel>Prioridad</InputLabel>
// //                             <Select
// //                                 name="prioridad"
// //                                 value={formData.prioridad}
// //                                 onChange={handleChange}
// //                             >
// //                                 {prioridades.map((prioridad) => (
// //                                     <MenuItem key={prioridad.value} value={prioridad.value}>
// //                                         {prioridad.label}
// //                                     </MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                     </Grid>
// //
// //                     <Grid item xs={12} sm={6}>
// //                         <TextField
// //                             fullWidth
// //                             label="Fecha Programada"
// //                             type="date"
// //                             name="fecha_programada"
// //                             value={formData.fecha_programada}
// //                             onChange={handleChange}
// //                             InputLabelProps={{ shrink: true }}
// //                             required
// //                         />
// //                     </Grid>
// //
// //                     <Grid item xs={12} sm={6}>
// //                         <TextField
// //                             fullWidth
// //                             label="Hora Programada"
// //                             type="time"
// //                             name="hora_programada"
// //                             value={formData.hora_programada}
// //                             onChange={handleChange}
// //                             InputLabelProps={{ shrink: true }}
// //                             required
// //                         />
// //                     </Grid>
// //
// //                     <Grid item xs={12}>
// //                         <TextField
// //                             fullWidth
// //                             label="Descripción"
// //                             name="descripcion"
// //                             value={formData.descripcion}
// //                             onChange={handleChange}
// //                             multiline
// //                             rows={4}
// //                             required
// //                         />
// //                     </Grid>
// //                 </Grid>
// //
// //                 {error && (
// //                     <Alert severity="error" sx={{ mt: 2 }}>
// //                         {error}
// //                     </Alert>
// //                 )}
// //             </DialogContent>
// //             <DialogActions>
// //                 <Button onClick={onClose}>Cancelar</Button>
// //                 <Button
// //                     variant="contained"
// //                     onClick={handleSubmit}
// //                     disabled={loading || !isFormValid()}
// //                 >
// //                     {loading ? <CircularProgress size={24} /> : 'Crear Orden'}
// //                 </Button>
// //             </DialogActions>
// //         </Dialog>
// //     );
// // };
// //
// // export default React.memo(AddOrderForm);
//
//
// // components/AddOrderForm.js
// import React, { useState, useEffect } from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Grid,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Typography,
//     Alert,
//     Autocomplete,
//     Box,
//     CircularProgress,
//     FormControlLabel,
//     Checkbox,
// } from '@mui/material';
// import {
//     buscarCliente,
//     getEstadoContrato,
//     createOrdenTrabajo
// } from '../services/ClientService';
//
// const tiposOrden = [
//     { id: 'instalacion', nombre: 'Instalación' },
//     { id: 'mantenimiento', nombre: 'Mantenimiento' },
//     { id: 'reparacion', nombre: 'Reparación' },
//     { id: 'desinstalacion', nombre: 'Desinstalación' }
// ];
//
// const sectores = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
//
// const motivos = {
//     instalacion: ['Nueva Instalación', 'Reinstalación', 'Ampliación'],
//     mantenimiento: ['Preventivo', 'Correctivo', 'Actualización'],
//     reparacion: ['Falla de Equipo', 'Problemas de Conexión', 'Daño Físico'],
//     desinstalacion: ['Cancelación de Servicio', 'Cambio de Domicilio', 'Temporal']
// };
//
// const prioridades = [
//     { value: 'baja', label: 'Baja' },
//     { value: 'normal', label: 'Normal' },
//     { value: 'alta', label: 'Alta' },
//     { value: 'urgente', label: 'Urgente' }
// ];
//
// const AddOrderForm = ({ open, onClose, onOrderCreated, sucursalId }) => {
//     // Estados para manejo del formulario
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(false);
//     const [clientes, setClientes] = useState([]);
//     const [searchingClientes, setSearchingClientes] = useState(false);
//     const [selectedCliente, setSelectedCliente] = useState(null);
//     const [contratoEstado, setContratoEstado] = useState(null);
//     const [sinClienteDefinido, setSinClienteDefinido] = useState(false);
//
//     // Estado del formulario
//     const [formData, setFormData] = useState({
//         tipo_orden: '',
//         sector: '',
//         motivo: '',
//         descripcion: '',
//         fecha_programada: '',
//         hora_programada: '',
//         prioridad: 'normal',
//         cliente_id: '',
//         contrato_id: '',
//         cliente_nombre: '',
//         cliente_contacto: ''
//     });
//
//     useEffect(() => {
//         if (!open) {
//             resetForm();
//         }
//     }, [open]);
//
//     const resetForm = () => {
//         setFormData({
//             tipo_orden: '',
//             sector: '',
//             motivo: '',
//             descripcion: '',
//             fecha_programada: '',
//             hora_programada: '',
//             prioridad: 'normal',
//             cliente_id: '',
//             contrato_id: '',
//             cliente_nombre: '',
//             cliente_contacto: ''
//         });
//         setSelectedCliente(null);
//         setContratoEstado(null);
//         setSinClienteDefinido(false);
//         setError(null);
//         setSuccess(false);
//     };
//
//     const handleClienteSearch = async (searchTerm) => {
//         if (!searchTerm || searchTerm.length < 3 || !sucursalId) return;
//
//         setSearchingClientes(true);
//         try {
//             const token = localStorage.getItem('token');
//             const result = await buscarCliente(token, sucursalId, searchTerm);
//             if (result.clientes) {
//                 setClientes(result.clientes);
//             }
//         } catch (error) {
//             setError('Error al buscar clientes');
//             setClientes([]);
//         } finally {
//             setSearchingClientes(false);
//         }
//     };
//
//     const handleClienteChange = async (event, value) => {
//         setSelectedCliente(value);
//         if (value) {
//             setFormData(prev => ({
//                 ...prev,
//                 cliente_id: value.Cod_Cliente,
//                 cliente_nombre: `${value.Nombre1} ${value.Nombre2 || ''} ${value.Apellido1} ${value.Apellido2 || ''}`.trim(),
//                 cliente_contacto: value.Celular || value.Telefono,
//                 contrato_id: value.contratos?.length === 1 ? value.contratos[0] : ''
//             }));
//
//             if (value.contratos?.length === 1) {
//                 const token = localStorage.getItem('token');
//                 try {
//                     const estadoContrato = await getEstadoContrato(token, sucursalId, value.contratos[0]);
//                     setContratoEstado(estadoContrato);
//                 } catch (error) {
//                     console.error('Error al obtener estado del contrato:', error);
//                 }
//             }
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 cliente_id: '',
//                 cliente_nombre: '',
//                 cliente_contacto: '',
//                 contrato_id: ''
//             }));
//             setContratoEstado(null);
//         }
//     };
//
//     const handleSinClienteDefinidoChange = (event) => {
//         setSinClienteDefinido(event.target.checked);
//         if (event.target.checked) {
//             setSelectedCliente(null);
//             setFormData(prev => ({
//                 ...prev,
//                 cliente_id: '',
//                 contrato_id: '',
//                 cliente_nombre: '',
//                 cliente_contacto: ''
//             }));
//             setContratoEstado(null);
//         }
//     };
//
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };
//
//     const isFormValid = () => {
//         if (!sinClienteDefinido && (!formData.cliente_id || !formData.contrato_id)) {
//             return false;
//         }
//         if (sinClienteDefinido && (!formData.cliente_nombre || !formData.cliente_contacto)) {
//             return false;
//         }
//         return (
//             formData.tipo_orden &&
//             formData.sector &&
//             formData.motivo &&
//             formData.descripcion &&
//             formData.fecha_programada &&
//             formData.hora_programada
//         );
//     };
//
//     const handleSubmit = async () => {
//         if (!isFormValid()) {
//             setError('Por favor, complete todos los campos requeridos');
//             return;
//         }
//
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const orderData = {
//                 ...formData,
//                 sucursal_id: sucursalId,
//                 sin_cliente_definido: sinClienteDefinido
//             };
//
//             const response = await createOrdenTrabajo(token, orderData);
//             setSuccess(true);
//             setTimeout(() => {
//                 onOrderCreated(response);
//                 onClose();
//             }, 2000);
//         } catch (error) {
//             setError('Error al crear la orden de trabajo');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//             <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
//             <DialogContent>
//                 <Grid container spacing={2} sx={{ mt: 1 }}>
//                     <Grid item xs={12}>
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     checked={sinClienteDefinido}
//                                     onChange={handleSinClienteDefinidoChange}
//                                 />
//                             }
//                             label="No tengo cliente definido"
//                         />
//                     </Grid>
//
//                     {!sinClienteDefinido ? (
//                         <>
//                             <Grid item xs={12}>
//                                 <Autocomplete
//                                     options={clientes}
//                                     getOptionLabel={(option) =>
//                                         `${option.Nombre1} ${option.Nombre2 || ''} ${option.Apellido1} ${option.Apellido2 || ''}`.trim()
//                                     }
//                                     loading={searchingClientes}
//                                     value={selectedCliente}
//                                     onChange={handleClienteChange}
//                                     onInputChange={(event, value) => handleClienteSearch(value)}
//                                     renderInput={(params) => (
//                                         <TextField
//                                             {...params}
//                                             label="Cliente"
//                                             required
//                                             InputProps={{
//                                                 ...params.InputProps,
//                                                 endAdornment: (
//                                                     <>
//                                                         {searchingClientes && <CircularProgress color="inherit" size={20} />}
//                                                         {params.InputProps.endAdornment}
//                                                     </>
//                                                 ),
//                                             }}
//                                         />
//                                     )}
//                                 />
//                             </Grid>
//
//                             {selectedCliente && selectedCliente.contratos && (
//                                 <Grid item xs={12}>
//                                     <FormControl fullWidth required>
//                                         <InputLabel>Contrato</InputLabel>
//                                         <Select
//                                             name="contrato_id"
//                                             value={formData.contrato_id}
//                                             onChange={handleChange}
//                                             label="Contrato"
//                                         >
//                                             {selectedCliente.contratos.map((contrato) => (
//                                                 <MenuItem key={contrato} value={contrato}>
//                                                     {contrato}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             )}
//
//                             {contratoEstado && (
//                                 <Grid item xs={12}>
//                                     <Alert
//                                         severity={contratoEstado.estadoActual.estado === 'Activo' ? 'success' : 'error'}
//                                     >
//                                         Estado del contrato: {contratoEstado.estadoActual.estado}
//                                     </Alert>
//                                 </Grid>
//                             )}
//                         </>
//                     ) : (
//                         <>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="Nombre del cliente"
//                                     name="cliente_nombre"
//                                     value={formData.cliente_nombre}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="Contacto del cliente"
//                                     name="cliente_contacto"
//                                     value={formData.cliente_contacto}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                         </>
//                     )}
//
//                     <Grid item xs={12} sm={6}>
//                         <FormControl fullWidth required>
//                             <InputLabel>Tipo de Orden</InputLabel>
//                             <Select
//                                 name="tipo_orden"
//                                 value={formData.tipo_orden}
//                                 onChange={handleChange}
//                                 label="Tipo de Orden"
//                             >
//                                 {tiposOrden.map((tipo) => (
//                                     <MenuItem key={tipo.id} value={tipo.id}>
//                                         {tipo.nombre}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//
//                     <Grid item xs={12} sm={6}>
//                         <FormControl fullWidth required>
//                             <InputLabel>Sector</InputLabel>
//                             <Select
//                                 name="sector"
//                                 value={formData.sector}
//                                 onChange={handleChange}
//                                 label="Sector"
//                             >
//                                 {sectores.map((sector) => (
//                                     <MenuItem key={sector} value={sector}>
//                                         {sector}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//
//                     <Grid item xs={12} sm={6}>
//                         <FormControl fullWidth required>
//                             <InputLabel>Motivo</InputLabel>
//                             <Select
//                                 name="motivo"
//                                 value={formData.motivo}
//                                 onChange={handleChange}
//                                 label="Motivo"
//                                 disabled={!formData.tipo_orden}
//                             >
//                                 {formData.tipo_orden && motivos[formData.tipo_orden]?.map((motivo) => (
//                                     <MenuItem key={motivo} value={motivo}>
//                                         {motivo}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//
//                     <Grid item xs={12} sm={6}>
//                         <FormControl fullWidth required>
//                             <InputLabel>Prioridad</InputLabel>
//                             <Select
//                                 name="prioridad"
//                                 value={formData.prioridad}
//                                 onChange={handleChange}
//                                 label="Prioridad"
//                             >
//                                 {prioridades.map((prioridad) => (
//                                     <MenuItem key={prioridad.value} value={prioridad.value}>
//                                         {prioridad.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             fullWidth
//                             label="Fecha Programada"
//                             type="date"
//                             name="fecha_programada"
//                             value={formData.fecha_programada}
//                             onChange={handleChange}
//                             InputLabelProps={{ shrink: true }}
//                             required
//                         />
//                     </Grid>
//
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             fullWidth
//                             label="Hora Programada"
//                             type="time"
//                             name="hora_programada"
//                             value={formData.hora_programada}
//                             onChange={handleChange}
//                             InputLabelProps={{ shrink: true }}
//                             required
//                         />
//                     </Grid>
//
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="Descripción"
//                             name="descripcion"
//                             value={formData.descripcion}
//                             onChange={handleChange}
//                             multiline
//                             rows={4}
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//
//                 {error && (
//                     <Alert severity="error" sx={{ mt: 2 }}>
//                         {error}
//                     </Alert>
//                 )}
//
//                 {success && (
//                     <Alert severity="success" sx={{ mt: 2 }}>
//                         Orden de trabajo creada exitosamente
//                     </Alert>
//                 )}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} disabled={loading}>
//                     Cancelar
//                 </Button>
//                 <Button
//                     variant="contained"
//                     onClick={handleSubmit}
//                     disabled={loading || !isFormValid()}
//                 >
//                     {loading ? (
//                         <CircularProgress size={24} />
//                     ) : (
//                         'Crear Orden'
//                     )}
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };
//
// export default AddOrderForm;
