import axios from 'axios';

export const httpClient = axios.create({
	baseURL: "https://localhost:5000",
	//baseURL: "https://80.121.92.0:7465",
    headers: {
        "Content-Type": "application/json"
    }
});
