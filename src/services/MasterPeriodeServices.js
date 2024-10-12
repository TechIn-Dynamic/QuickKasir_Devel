import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcyODczODEyNCwiZXhwIjoxNzI5MzQyOTI0fQ.bo5BDPzJP_WaFOBLt3SxHBbJ7ozUujReP8zl5kUQJk0';

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

const savePeriodeData = async (formData) => {
    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PERIODE}`, {
            name: formData.periodeName,
            date_start: formData.periodeFrom,
            date_end: formData.periodeTo,
        }, {
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

export { getPeriodeData, savePeriodeData };
