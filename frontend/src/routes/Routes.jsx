import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchPictures = async () => {
    try {
        const response = await axios.get(`${API_URL}/pictures`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pictures:", error);
        throw error;
    }
};