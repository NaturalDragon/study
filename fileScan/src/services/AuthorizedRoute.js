import request from "../utils/request";
import qs from "qs";
import Request from "./axiosRequest";

export function CheckPey(params) {
  return Request(`/api/Login/CheckPey?${qs.stringify(params)}`, {
    request: "get",
  });
}
export function CheckToken(params) {
  return Request( `${window.AppSetting.openApiIp}/api/InvoiceAssistant/Get`,{
  
    method: "post",
    data: JSON.stringify(params),
  });
}