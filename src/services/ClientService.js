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
