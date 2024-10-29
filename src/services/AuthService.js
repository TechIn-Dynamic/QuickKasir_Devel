import axios from "axios";
import CONFIG from "../config/config.json";

const loginService = async (payload) => {
    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_LOGIN_SERVICE}`, payload);

        return response.data;
    } catch (error) {
        alert("Login Gagal Harap Perksa Kembali Username / Password Anda!")
        throw error;
    }
};

export { loginService };