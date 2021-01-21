import axios from 'axios';

// Getting Auth Token From LocalStorage
let authToken = localStorage.getItem('authToken');

// Exporting and creating the axios instance
export const axiosClient = axios.create();

if (authToken !== null) {

    // Attacting auth token on header with every request
    axiosClient.defaults.headers.common['authorization'] = `Bearer ${authToken}`;
}

// intercepting the api response and when token is got expired we're redirecting to login page
axiosClient.interceptors.response.use((response) => {
    return response;
}, error => {
    if (error.response.status === 403) {
        // window.location.href = 'http://localhost:3001/login';
    }
});