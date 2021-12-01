import {AxiosPromise} from 'axios';
import request from '@/api/reqeust';

export const getBannerRequest = (): AxiosPromise<any> => {
  return request({
    url: `/banner`,
    method: 'get',
  });
};

export const getRecommendListRequest =  (): AxiosPromise<any> => {
 
    return request({
        url: `/personalized`,
        method: 'get',
      });
}
// import request from '@/utils/request'
// export function getBannerRequest() {
//   return request(`/banner`, {
//     method: "GET",
//     mode: 'cors',
//     traditional: true,
//   });
// }

// export function getRecommendListRequest() {
//   return request(`/personalized`, {
//     method: "GET",
//     mode: 'cors',
//     traditional: true,
//   });
// }