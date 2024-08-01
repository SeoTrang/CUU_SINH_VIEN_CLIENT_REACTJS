import axios from 'axios';
import Cookies from 'js-cookie';
import { accessToken } from '../../constant/constant';

const API_URL = import.meta.env.VITE_API_URL;
// let accessToken = Cookies.get("accessToken");
const instance = axios.create({
  baseURL: API_URL,
  // headers:{
  //   common: {
  //     'Authorization': accessToken ? `Bearer ${accessToken}` : ''
  //   }
  // }
});

// export default instance;

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken1 = Cookies.get(accessToken);
    if (accessToken1) {
      config.headers['Authorization'] = `Bearer ${accessToken1}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


