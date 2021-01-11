import axios from 'axios';

export const httpClient = axios.create({
    baseURL: "https://www.ebimt.pro:5001",
    headers: {
        "Content-Type": "application/json"
    }
});