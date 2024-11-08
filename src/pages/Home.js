// import React from 'react';
// import {
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     Stack,
//     Chip,
//     LinearProgress,
//     Paper
// } from '@mui/material';
// import {
//     Assignment as TaskIcon,
//     CheckCircle as CompleteIcon,
//     Warning as PendingIcon,
//     AccessTime as UrgentIcon,
// } from '@mui/icons-material';
//
// // Datos de ejemplo
// const mockData = {
//     pendingSchedules: 15,
//     completedSchedules: 8,
//     urgentSchedules: 3,
//     todaySchedules: 5,
//     weeklyProgress: 65,
//     technicians: [
//         { id: 1, name: "Juan Pérez", status: "available", activeSchedules: 2 },
//         { id: 2, name: "María López", status: "busy", activeSchedules: 4 },
//         { id: 3, name: "Carlos Ruiz", status: "offline", activeSchedules: 0 },
//     ],
//     recentSchedules: [
//         { id: 1, title: "Instalación Residencial", status: "pending", priority: "high" },
//         { id: 2, title: "Mantenimiento Empresarial", status: "in_progress", priority: "medium" },
//         { id: 3, title: "Soporte Técnico", status: "completed", priority: "low" },
//     ]
// };
//
// // Componente para las tarjetas de estadísticas
// const StatCard = ({ icon: Icon, title, value, color }) => (
//     <Card>
//         <CardContent>
//             <Stack direction="row" spacing={2} alignItems="center">
//                 <Icon sx={{ fontSize: 40, color }} />
//                 <Box>
//                     <Typography variant="h4" component="div">
//                         {value}
//                     </Typography>
//                     <Typography color="text.secondary">
//                         {title}
//                     </Typography>
//                 </Box>
//             </Stack>
//         </CardContent>
//     </Card>
// );
//
// const Home = () => {
//     const user = JSON.parse(localStorage.getItem('usersoporte'));
//     const isAdmin = user?.role === 'admin' || user?.role === 'agendamiento';
//
//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>
//                 Dashboard de Soporte Técnico
//                             </Typography>
//
//             <Grid container spacing={3} mb={3}>
//                 {isAdmin ? (
//                     <>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <StatCard
//                                 icon={TaskIcon}
//                                 title="Agendamientos Pendientes"
//                                 value={mockData.pendingSchedules}
//                                 color="primary.main"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <StatCard
//                                 icon={CompleteIcon}
//                                 title="Completados"
//                                 value={mockData.completedSchedules}
//                                 color="success.main"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <StatCard
//                                 icon={UrgentIcon}
//                                 title="Urgentes"
//                                 value={mockData.urgentSchedules}
//                                 color="error.main"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <StatCard
//                                 icon={PendingIcon}
//                                 title="Para Hoy"
//                                 value={mockData.todaySchedules}
//                                 color="warning.main"
//                             />
//                         </Grid>
//                     </>
//                 ) : (
//                     <>
//                         <Grid item xs={12} sm={6}>
//                             <StatCard
//                                 icon={TaskIcon}
//                                 title="Mis Agendamientos"
//                                 value={3}
//                                 color="primary.main"
//                             />
//                         </Grid>
//
//
//
//                         <Grid item xs={12} sm={6}>
//                             <StatCard
//                                 icon={CompleteIcon}
//                                 title="Completados Hoy"
//                                 value={2}
//                                 color="success.main"
//                             />
//                         </Grid>
//                     </>
//                 )}
//             </Grid>
//
//             <Card sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Progreso Semanal
//                     </Typography>
//                     <Box sx={{ mt: 2 }}>
//                         <LinearProgress
//                             variant="determinate"
//                             value={mockData.weeklyProgress}
//                             sx={{ height: 10, borderRadius: 5 }}
//                         />
//                         <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
//                             {mockData.weeklyProgress}% Completado
//                         </Typography>
//                     </Box>
//                 </CardContent>
//             </Card>
//
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={isAdmin ? 8 : 12}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                                 Agendamientos Recientes
//                             </Typography>
//                             <Stack spacing={2}>
//                                 {mockData.recentSchedules.map((schedule) => (
//                                     <Paper key={schedule.id} elevation={1} sx={{ p: 2 }}>
//                                         <Stack direction="row" justifyContent="space-between" alignItems="center">
//                                             <Box>
//                                                 <Typography variant="subtitle1">
//                                                     {schedule.title}
//                                                 </Typography>
//                                                 <Chip
//                                                     size="small"
//                                                     label={schedule.status === 'pending' ? 'Pendiente' :
//                                                         schedule.status === 'in_progress' ? 'En Proceso' : 'Completado'}
//                                                     color={schedule.status === 'pending' ? 'warning' :
//                                                         schedule.status === 'in_progress' ? 'info' : 'success'}
//                                                     sx={{ mt: 1 }}
//                                                 />
//                                             </Box>
//                                             <Chip
//                                                 size="small"
//                                                 label={schedule.priority === 'high' ? 'Alta' :
//                                                     schedule.priority === 'medium' ? 'Media' : 'Baja'}
//                                                 color={schedule.priority === 'high' ? 'error' :
//                                                     schedule.priority === 'medium' ? 'warning' : 'success'}
//                                             />
//                                         </Stack>
//                                     </Paper>
//                                 ))}
//                             </Stack>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//
//                 {isAdmin && (
//                     <Grid item xs={12} md={4}>
//                         <Card>
//                             <CardContent>
//                                 <Typography variant="h6" gutterBottom>
//                                     Estado de Técnicos
//                                 </Typography>
//                                 <Stack spacing={2}>
//                                     {mockData.technicians.map((tech) => (
//                                         <Paper key={tech.id} elevation={1} sx={{ p: 2 }}>
//                                             <Stack direction="row" justifyContent="space-between" alignItems="center">
//                                                 <Typography>
//                                                     {tech.name}
//                                                 </Typography>
//                                                 <Box>
//                                                     <Chip
//                                                         size="small"
//                                                         label={tech.status === 'available' ? 'Disponible' :
//                                                             tech.status === 'busy' ? 'Ocupado' : 'Offline'}
//                                                         color={tech.status === 'available' ? 'success' :
//                                                             tech.status === 'busy' ? 'warning' : 'default'}
//                                                         sx={{ mr: 1 }}
//                                                     />
//                                                     <Chip
//                                                         size="small"
//                                                         label={`${tech.activeSchedules} agendados`}
//                                                         color="primary"
//                                                     />
//                                                 </Box>
//                                             </Stack>
//                                         </Paper>
//                                     ))}
//                                 </Stack>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 )}
//             </Grid>
//         </Box>
//     );
// };
//
// export default Home;
