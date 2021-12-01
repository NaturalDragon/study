import {AxiosPromise} from 'axios';
import request from '@/api/reqeust';

export const getSingerInfoRequest = (id:string): AxiosPromise<any> => {
  return request({
    url: `/artists?id=${id}`,
    method: 'get',
  });
};


