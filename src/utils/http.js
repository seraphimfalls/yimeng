import axios from "axios";
import config from "../config";
import * as storage from "../utils/storage";

const http = axios.create({
    baseURL:config.apiUrl, //这里是API基础地址
    timeout: 6000 // 请求超时时间
});

const err = error => {
    return Promise.reject(error);
};

// request interceptor
http.interceptors.request.use(config => {
    const token = storage.getString("yimeng_token");
    if (token) {
        if (config.data) {
            config.data.set("yimeng_token", token);
        } else {
            const formData = new FormData();
            formData.set("yimeng_token", token);
            config.data = formData;
        }
    }
    return config;
}, err);

// response interceptor
http.interceptors.response.use(response => {
    return response.data;
}, err);

export default http;
