import axios from 'axios';

const webSocket = axios.create({
    baseURL: process.env.REACT_APP_WEB_SOCKET_URL
});

export default webSocket;