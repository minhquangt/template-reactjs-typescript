import axiosClient from 'src/configs/axiosClient';
import { ResponseForm } from 'src/types/common';
import { Profile, RegisterData } from 'src/types/user';

const endpoint = '/auth';

export const authApi = {
  register(data: RegisterData): Promise<ResponseForm<Profile>> {
    return axiosClient.post(`${endpoint}/register`, data);
  },
  login(data: RegisterData): Promise<ResponseForm<Profile>> {
    return axiosClient.post(`${endpoint}/login`, data);
  },
  logout(): Promise<ResponseForm<Profile>> {
    return axiosClient.post(`${endpoint}/logout`);
  },
  refreshToken(refreshToken: string): Promise<ResponseForm<{ accessToken: string }>> {
    return axiosClient.post(`${endpoint}/refresh-token`, { refreshToken });
  }
};
