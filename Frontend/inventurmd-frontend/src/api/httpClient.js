import axios from 'axios';

export const httpClient = axios.create({
    baseURL: "https://80.121.92.0:7465",
    headers: {
        "Content-Type": "application/json"
    }
});
