// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    LinearProgress,
    Paper
} from '@mui/material';
import {
    Assignment as TaskIcon,
    CheckCircle as CompleteIcon,
    Warning as PendingIcon,
    AccessTime as UrgentIcon,
} from '@mui/icons-material';

// Datos de ejemplo
const mockData = {
    pendingTasks: 15,
    completedTasks: 8,
    urgentTasks: 3,
    todayTasks: 5,
    weeklyProgress: 65,
    technicians: [
        { id: 1, name: "Juan Pérez", status: "available", activeTasks: 2 },
        { id: 2, name: "María López", status: "busy", activeTasks: 4 },
        { id: 3, name: "Carlos Ruiz", status: "offline", activeTasks: 0 },
    ],
    recentTasks: [
        { id: 1, title: "Mantenimiento Router Principal", status: "pending", priority: "high" },
        { id: 2, title: "Instalación Fibra Óptica", status: "in_progress", priority: "medium" },
        { id: 3, title: "Reparación Switch", status: "completed", priority: "low" },
    ]
};

// Componente para las tarjetas de estadísticas
const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card>
        <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
                <Icon sx={{ fontSize: 40, color }} />
                <Box>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                    <Typography color="text.secondary">
                        {title}
                    </Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

// Componente para la lista de tareas recientes
const RecentTasks = ({ tasks }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Tareas Recientes
            </Typography>
            <Stack spacing={2}>
                {tasks.map((task) => (
                    <Paper key={task.id} elevation={1} sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="subtitle1">
                                    {task.title}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={task.status === 'pending' ? 'Pendiente' :
                                        task.status === 'in_progress' ? 'En Proceso' : 'Completado'}
                                    color={task.status === 'pending' ? 'warning' :
                                        task.status === 'in_progress' ? 'info' : 'success'}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                            <Chip
                                size="small"
                                label={task.priority}
                                color={task.priority === 'high' ? 'error' :
                                    task.priority === 'medium' ? 'warning' : 'success'}
                            />
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </CardContent>
    </Card>
);

// Componente para la lista de técnicos (solo para admin)
const TechniciansList = ({ technicians }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Estado de Técnicos
            </Typography>
            <Stack spacing={2}>
                {technicians.map((tech) => (
                    <Paper key={tech.id} elevation={1} sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography>
                                {tech.name}
                            </Typography>
                            <Box>
                                <Chip
                                    size="small"
                                    label={tech.status === 'available' ? 'Disponible' :
                                        tech.status === 'busy' ? 'Ocupado' : 'Offline'}
                                    color={tech.status === 'available' ? 'success' :
                                        tech.status === 'busy' ? 'warning' : 'default'}
                                    sx={{ mr: 1 }}
                                />
                                <Chip
                                    size="small"
                                    label={`${tech.activeTasks} tareas`}
                                    color="primary"
                                />
                            </Box>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </CardContent>
    </Card>
);

// Dashboard principal
const Dashboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin' || user?.role === 'agendamiento';

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* Estadísticas principales */}
            <Grid container spacing={3} mb={3}>
                {isAdmin ? (
                    // Vista de Administrador
                    <>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={TaskIcon}
                                title="Tareas Pendientes"
                                value={mockData.pendingTasks}
                                color="primary.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={CompleteIcon}
                                title="Completadas"
                                value={mockData.completedTasks}
                                color="success.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={UrgentIcon}
                                title="Urgentes"
                                value={mockData.urgentTasks}
                                color="error.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={PendingIcon}
                                title="Para Hoy"
                                value={mockData.todayTasks}
                                color="warning.main"
                            />
                        </Grid>
                    </>
                ) : (
                    // Vista de Técnico
                    <>
                        <Grid item xs={12} sm={6}>
                            <StatCard
                                icon={TaskIcon}
                                title="Mis Tareas Pendientes"
                                value={3}
                                color="primary.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StatCard
                                icon={CompleteIcon}
                                title="Completadas Hoy"
                                value={2}
                                color="success.main"
                            />
                        </Grid>
                    </>
                )}
            </Grid>

            {/* Progreso Semanal */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Progreso Semanal
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={mockData.weeklyProgress}
                            sx={{ height: 10, borderRadius: 5 }}
                        />
                        <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
                            {mockData.weeklyProgress}% Completado
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Contenido específico según rol */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={isAdmin ? 8 : 12}>
                    <RecentTasks tasks={mockData.recentTasks} />
                </Grid>
                {isAdmin && (
                    <Grid item xs={12} md={4}>
                        <TechniciansList technicians={mockData.technicians} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Dashboard;