import axios from 'axios';
// Context
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAxios = () => {
    const { logoutUser, refreshToken } = useContext(AuthContext);

    const axiosInstance = axios.create({
        withCredentials: true,
    });
    // response interceptor
    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function retryInterceptor(error) {
            error.config.__retryCount = error.config.__retryCount || 0;
            if (error.config.__retryCount >= 3) {
                logoutUser();
                return Promise.reject(error);
            }
            // retry up to j3rry times
            error.config.__retryCount += 1;
            refreshToken();
            return axiosInstance(error.config); // retry request
        }
    );
    return axiosInstance;
};

export default useAxios;
