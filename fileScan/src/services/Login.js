import request from "../utils/request";
import qs from "qs";
import Request from "./axiosRequest";

export function LoginAuthor(params) {
  return Request({
    url: `${window.AppSetting.serverIp}/api/Login/Login`,
    method: "post",
    data: JSON.stringify(params),
  });
}

export function TestLogin(params) {
  return Request(`/api/Login/TestLogin?${qs.stringify(params)}`, {
    method: "get",
  });
}

export function CheckIsDealter(params) {
  return Request(
    `/api/WXConstructionTeam/CheckIsDealter?${qs.stringify(params)}`,
    {
      method: "get",
    }
  );
}

export function SendMsg(params) {
  return Request(`/api/WXConstructionTeam/SendMsg?${qs.stringify(params)}`, {
    method: "get",
  });
}

export function Register(params) {
  return Request(`/api/Login/Register?${qs.stringify(params)}`, {
    method: "get",
  });
}
