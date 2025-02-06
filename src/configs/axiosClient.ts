import axios from 'axios';
import { authApi } from 'src/services/authApi';

let axiosClient = axios.create({});

axiosClient.defaults.timeout = 1000 * 60 * 10;
axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Khởi tạo 1 promise cho việc gọi api refresh token
// Mục đích là để khi nhận yêu cầu refreshToken đầu tiên thì hold lại việc gọi API refreshToken cho tới khi xong xuôi thì mới retry lại những API bị lỗi trước đó thay vì cứ thế gọi API refreshToken liên tục với mõi request bị lỗi
let refreshTokenPromise: any = null;

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý refresh token
    // Nếu response trả về là 401 (Unauthorized) thì logout ra khỏi hệ thống
    if (error.response?.status === 401) {
      authApi.logout().then(() => {
        // Nếu trường hợp dùng cookie thì nhớ xóa userInfo trong localStorage
        // localStorage.removeItem('userInfo');

        location.href = '/login';
      });
    }
    // Nếu nhận mã 410 (Gone) thì có thể là refresh token hết hạn
    const originalRequest = error.config;
    if (error.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        // Th1: Dùng localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        refreshTokenPromise = authApi
          .refreshToken(refreshToken as string)
          .then((res) => {
            // Th1: Dùng localStorage
            const accessToken = res.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
            // Th2: Dùng Http only cookie
          })
          .catch(() => {
            authApi.logout().then(() => {
              // Nếu trường hợp dùng cookie thì nhớ xóa userInfo trong localStorage
              // localStorage.removeItem('userInfo');

              location.href = '/login';
            });
            return Promise.reject(error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        // return lại axios instance kết hợp với originalRequest để call lại request ban đầu bị lỗi
        return axiosClient(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
