import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchVideos = async () => {
    try {
        const response = await axios.get(`${API_URL}/videos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};