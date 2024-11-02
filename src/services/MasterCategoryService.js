import axios from "axios";
import CONFIG from "../config/config.json";

const token = localStorage.getItem("token");

export const getCategory = async () => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_CATEGORY}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_CATEGORY}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const saveCategory = async (requestBody) => {
    
    let formDataSet = new FormData();
    // let fileBLob = await fetch('requestBody.formData.icon');

    // if (fileBLob.ok && fileBLob.headers.get("Content-Type").startsWith("image/")) {
    //     let setBlob = await fileBLob.blob(); // Konversi ke blob hanya jika respons tipe image
    
        // Append data ke FormData
        formDataSet.append('name', requestBody.formData.nameCategory);
        formDataSet.append('ppn', 0);
        formDataSet.append('icon', requestBody.formData.icon);
        console.log(requestBody.formData);
    // } else {
    //     console.error("Failed to fetch image: The content is not an image or the request failed.");
    // }


    // let setBlob = await fileBLob.blob();

    //     formDataSet.append('name', requestBody.formData.nameCategory);
    //     formDataSet.append('ppn', 0);
    //     formDataSet.append('icon', setBlob, 'image.png');
    //     console.log(setBlob);
        
    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_CATEGORY}`, formDataSet, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        console.log(response);
        

        // return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (requestBody) => {
    try {
        const response = await axios.put(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_CATEGORY}/${requestBody.id}`, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${CONFIG.API_BASE_URL}${CONFIG.API_MASTER_CATEGORY}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};