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
};
