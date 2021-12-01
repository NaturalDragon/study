import {AxiosPromise} from 'axios';
import request from '@/api/reqeust';

export const getAlbumDetailRequest = (id:string): AxiosPromise<any> => {
  return request({
    url:`/playlist/detail?id=${id}`,
    method: 'get',
  });
};




