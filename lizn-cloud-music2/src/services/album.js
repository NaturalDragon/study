import { axiosInstance } from '../api/config'
export const getAlbumDetailRequest = (id) => {
    return axiosInstance.get (`/playlist/detail?id=${id}`);
  };

  
