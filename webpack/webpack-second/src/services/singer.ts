import {AxiosPromise} from 'axios';
import request from '@/api/reqeust';

export const getHotSingerListRequest = (count:number): AxiosPromise<any> => {
  return request({
    url: `/top/artists?offset=${count}`,
    method: 'get',
  });
};

export const getSingerListRequest = (type:string,area:string,alpha:string,count:number): AxiosPromise<any> => {
  return request({
    url:  `/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`,
    method: 'get',
  });
};

