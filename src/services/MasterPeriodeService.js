import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcyODgxMTgxNCwiZXhwIjoxNzI5NDE2NjE0fQ.xpNBfFroOU5yNZE7U6gVpkZ6Slr3m4PnVZhXQOXU9Ts';

const getPeriodeData = async () => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error fetching periode data:", error.response ? error.response.data : error.message);
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

        return response.data.data;
    } catch (error) {
        console.error("Error saving periode data:", error.response ? error.response.data : error.message);
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

        return response.data.data;
    } catch (error) {
        console.error("Error updating periode data:", error.response ? error.response.data : error.message);
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

        return response.data.data;
    } catch (error) {
        console.error("Error deleting periode data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { getPeriodeData, savePeriodeData, updatePeriodeData, deletePeriodeData };
