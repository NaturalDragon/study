import { axiosInstance } from '../api/config'
export const getHotSingerListRequest = count => {
    return axiosInstance.get(`/top/artists?offset=${0}`);
  };