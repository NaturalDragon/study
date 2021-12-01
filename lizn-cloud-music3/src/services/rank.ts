import { AxiosPromise } from "axios";
import request from "@/api/reqeust";

export const getRankRequest = (): AxiosPromise<any> => {
  return request({
    url: `/toplist/detail`,
    method: "get",
  });
};
