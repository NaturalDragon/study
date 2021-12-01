/** @format */

import { AxiosPromise } from "axios";
import request from "../utils/request";
import { ILogInfo } from "../logInfo/logInfoSlice";
export const getLogInfoListRequest = (
  data: any
): AxiosPromise<Array<ILogInfo>> => {
  return request({
    url: `/api/LogInfo/GetPageList`,
    method: "post",
    data: data,
  });
};
