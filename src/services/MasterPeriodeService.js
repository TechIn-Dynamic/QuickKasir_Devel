import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token");

const getPeriodeData = async () => {
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

const savePeriodeData = async (payload) => {
    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

const updatePeriodeData = async (payload) => {
    try {
        const response = await axios.put(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}/${payload.id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

const deletePeriodeData = async (id) => {
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

export { getPeriodeData, savePeriodeData, updatePeriodeData, deletePeriodeData };
