import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: "https://petlove-backend-jniu.onrender.com/api"
    withCredentials: true,
})