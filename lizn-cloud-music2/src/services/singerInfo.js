import { axiosInstance } from '../api/config'
export const getSingerInfoRequest = id => {
    return axiosInstance.get (`/artists?id=${id}`);
  };