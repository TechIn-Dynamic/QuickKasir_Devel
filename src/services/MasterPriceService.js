import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcyODgwNjkzMSwiZXhwIjoxNzI4ODEwNTMxfQ.Tsn2xeQ0GJAD8gqcOEi7nZkOEirK0KWzamCTEdtJ2Eo';

const getPriceByMenuId = async (menuId) => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}?id_menu=${menuId}`, {
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
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_PRICE}`, {
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

export { getPriceByMenuId, savePeriodeData };
