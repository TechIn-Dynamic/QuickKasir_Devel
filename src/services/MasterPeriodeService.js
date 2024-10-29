import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token");

export const getPeriode = async () => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPeriodeById = async (id) => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const savePeriode = async (requestBody) => {
    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}`, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePeriode = async (requestBody) => {
    try {
        const response = await axios.put(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}/${requestBody.id}`, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePeriode = async (id) => {
    try {
        const response = await axios.delete(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};