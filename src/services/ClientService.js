// services/ClientService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Reutilizamos las funciones existentes
export const getSucursales = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/sucursales`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sucursales:', error);
        throw error;
    }
};

export const getClientes = async (token, sucursalId) => {
    try {
        const response = await axios.get(`${API_URL}/clientes/${sucursalId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw error;
    }
};

export const buscarCliente = async (token, sucursalId, termino) => {
    try {
        const response = await axios.get(`${API_URL}/clientes/${sucursalId}/buscar`, {
            params: { termino },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching cliente:', error);
        throw error;
    }
};

export const getClienteById = async (token, sucursalId, clienteId) => {
    try {
        const response = await axios.get(`${API_URL}/clientes/${sucursalId}/cliente/${clienteId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cliente by ID:', error);
        throw error;
    }
};

export const getEstadoContrato = async (token, sucursalId, contratoId) => {
    try {
        const response = await axios.get(`${API_URL}/clientes/${sucursalId}/contrato/${contratoId}/estado`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching contract estado:', error);
        throw error;
    }
};

// Nuevas funciones para el sistema de agendamiento
export const validarClienteParaAgendamiento = async (token, sucursalId, clienteId, contratoId) => {
    try {
        const response = await axios.post(`${API_URL}/agendamiento/validar-cliente`, {
            sucursalId,
            clienteId,
            contratoId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error validating client for agendamiento:', error);
        throw error;
    }
};

export const getOrdenesCliente = async (token, sucursalId, clienteId) => {
    try {
        const response = await axios.get(`${API_URL}/agendamiento/ordenes/${sucursalId}/cliente/${clienteId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching client orders:', error);
        throw error;
    }
};

export const createOrdenTrabajo = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/agendamiento/ordenes`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating work order:', error);
        throw error;
    }
};

export const updateOrdenTrabajo = async (token, ordenId, data) => {
    try {
        const response = await axios.put(`${API_URL}/agendamiento/ordenes/${ordenId}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating work order:', error);
        throw error;
    }
};

export const getOrdenTrabajoById = async (token, ordenId) => {
    try {
        const response = await axios.get(`${API_URL}/agendamiento/ordenes/${ordenId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching work order:', error);
        throw error;
    }
};

export const getOrdenesBySucursal = async (token, sucursalId, params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/agendamiento/ordenes/sucursal/${sucursalId}`, {
            params,
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders by sucursal:', error);
        throw error;
    }
};