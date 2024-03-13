import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use((config) => { //используем конфигурацию axios
    config.headers.Authorization = window.localStorage.getItem('token'); //поместили токен в заголовок Authorization (при каждом запросе axios)
    return config;
});

export default instance;