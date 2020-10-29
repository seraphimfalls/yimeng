import axios from 'axios'
import qs from 'qs'
import { Toast } from "vant";
import store from '../store';
import router from '../router'
const instance = axios.create({
    // baseURL: '/api',
    baseURL: 'http://103.214.146.192',
    //timeout: 1000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
    withCredentials: true,
});
instance.interceptors.request.use((config) => {
    if (config.method === 'post') {
        //如果是post请求则进行序列化处理
        config.data = qs.stringify(config.data);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    if (res.data.code == 225) {
        localStorage.clear()
        router.replace({
            path: '/login',
        })
    }
    return res;
}, (error) => {
    //404等问题可以在这里处理
    Toast({ message: "网络延迟,请稍后再试！" });
    return Promise.reject(error);
});
export default instance