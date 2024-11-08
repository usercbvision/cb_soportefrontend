// src/services/authService.js

export const ALLOWED_ROLES = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Jefe Agencia" },
    { id: 3, name: "Técnico" },
    { id: 7, name: "Servicio Tecnico" }
];

export const validateUserAccess = () => {
    const userStr = localStorage.getItem('usersoporte');

    if (!userStr) {
        return {
            isValid: false,
            message: "No hay sesión de usuario"
        };
    }

    try {
        const user = JSON.parse(userStr);

        if (!user.roles || !Array.isArray(user.roles) || user.roles.length === 0) {
            return {
                isValid: false,
                message: "El usuario no tiene roles asignados"
            };
        }

        const hasValidRole = user.roles.some(userRole =>
            ALLOWED_ROLES.some(allowedRole => allowedRole.id === userRole.id)
        );

        if (!hasValidRole) {
            return {
                isValid: false,
                message: "No tienes permisos para acceder a esta sección"
            };
        }

        return {
            isValid: true,
            user
        };

    } catch (error) {
        console.error('Error validating user access:', error);
        return {
            isValid: false,
            message: "Error al validar la sesión del usuario"
        };
    }
};