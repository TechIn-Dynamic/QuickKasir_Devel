import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token");

export const getPrice = async () => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPriceById = async (id) => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const savePrice = async (requestBody) => {
    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}`, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePrice = async (requestBody) => {
    try {
        const response = await axios.put(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}/${requestBody.id}`, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePrice = async (id) => {
    try {
        const response = await axios.delete(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};