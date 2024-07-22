import axios from 'axios';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userToken';

// 使用create方法创建axios实例
const Service = axios.create({
    timeout: 8000,
    baseURL: 'http://127.0.0.1:8080',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截
Service.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request Headers in Interceptor:', config.headers);
    return config;
})

// 响应拦截
Service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        console.log(error);
        // 对响应错误做点什么
        const userStore = useUserStore();
        if (error.response && error.response.status === 401) {
            ElMessage.error('Token 不存在或已过期，请重新登录');
            userStore.clearToken();
            userStore.clearPrivilege();
            router.push('/login');
        } else {
            ElMessage.error(error.response?.data?.message || '请求失败');
        }
        return Promise.reject(error);
    }
)

// post请求
export const post = config => {
    return Service.post(config.url, config.data);
}
export const postByUrl = (url) =>{
    return Service.post(url);
}

// get请求
export const get = (url, params) => {
    return Service.get(url, { params });
};

// put 请求
export const put = config => {
    return Service.put(config.url, config.data);
};

// delete 请求
export const del = url => {
    return Service.delete(url);
};