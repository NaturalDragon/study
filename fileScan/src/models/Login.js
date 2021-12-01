import {
  LoginAuthor,
  CheckIsDealter,
  SendMsg,
  Register,
} from "../services/Login";
import common from "../utils/common";
import config from "../utils/config";
import { Toast } from "antd-mobile";
export default {
  namespace: "login",
  state: {
    MapData: [],
    IsRegister: false,
    loginInfo: {
      userName: "",
      password: "",
      platform: window.AppSetting.platform,
    },
    RegisterToken: "",
  },
  subscriptions: {},
  effects: {
    *CheckIsDealter({ payload }, { call, put }) {
      const { data } = yield call(CheckIsDealter, payload);
      if (data) {
      }
    },
    *SendMsg({ payload }, { call, put }) {
      const { data } = yield call(SendMsg, payload);
      if (data && data.Success) {
        //    yield put({
        //        type:"Register",
        //        payload:{mobile:payload.mobile,key:common.GetCookie('RegisterToken')}
        //    })
      }
    },
    *Register({ payload }, { call, put }) {
      Toast.loading("登录中...", 0);
      const { data } = yield call(Register, payload);
      Toast.hide();
      if (data && data.Success) {
        // common.SetPkey(data.Data);
        window.localStorage.setItem(config.pkey, data.data);
        yield put({
          type: "authorize/Power",
        });
      } else {
        Toast.info(data.Message, 1);
      }
    },
    *LoginAuthor({ payload }, { call, put }) {
      Toast.loading("登录中...", 0);
      const { data, status } = yield call(LoginAuthor, payload.info);
      Toast.hide();

      console.log(data, status);

      if (status !== 200) {
        Toast.fail(data.msg, 1);
        return;
      }

      if (data.success) {
        window.localStorage.setItem(config.pkey, data.data);
        yield put({
          type: "authorize/Power",
        });
        // yield put({
        //   type: "authorize/CheckToken",
        //   payload: { userCode: data.data, token: payload.token },
        // });
      } else {
        Toast.fail(data.msg, 1);
        return;
      }
    },
  },
  reducers: {
    ShowRegister(state, action) {
      common.SetCookie("RegisterToken", action.payload.token);
      return { ...state, IsRegister: true };
    },
    SetData(state, action) {
      var loginInfo = state.loginInfo;
      var obj = { ...loginInfo, ...action.payload.obj };
      return { ...state, loginInfo: obj };
    },
  },
};
