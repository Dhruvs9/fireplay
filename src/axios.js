import axios from 'axios';

const instance = axios.create({
    baseURL: '...'//the API URL(cloud function)
});

export default instance