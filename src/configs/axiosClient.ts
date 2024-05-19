import axios, { AxiosRequestConfig } from 'axios';
import { getRefreshToken } from 'src/utils/getToken';
import setAxiosHeader from 'src/utils/setAxiosHeader';

const axiosClient = axios.create({
  baseURL: '',
});

axiosClient.interceptors.request.use(
  async (config) => setAxiosHeader(config),
  (error) => {
    Promise.reject(error);
  }
);

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            await axios({
              method: 'POST',
              url: `api/v1/auth/refreshtoken`,
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                refreshToken: refreshToken,
              },
            })
              .then(async (response) => {
                localStorage.setItem('token', response?.data?.token);
                localStorage.setItem(
                  'refreshToken',
                  response?.data?.refreshToken
                );
                return axiosClient(originalRequest);
              })
              .catch((errorRefresh) => {
                console.log(errorRefresh);
                localStorage.clear();
              });
            // Repeat all miss request by 401
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosClient(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });
            refreshAndRetryQueue.length = 0;
          } else {
            localStorage.clear();
            window.location.href = '/';
            return Promise.reject(error);
          }
        } catch (refreshError) {
          refreshAndRetryQueue.length = 0;
          localStorage.clear();
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
