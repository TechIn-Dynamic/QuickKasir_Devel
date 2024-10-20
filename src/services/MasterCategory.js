import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token");
 
const getAllCategory = async (payload) => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_CATEGORY}`, {
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

export { getAllCategory };