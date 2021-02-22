import axios from 'axios';

export const httpClient = axios.create({
	baseURL: "https://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
});
