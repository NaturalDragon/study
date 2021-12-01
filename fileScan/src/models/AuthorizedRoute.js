import { CheckPey, CheckToken } from "../services/AuthorizedRoute";
import { Toast } from "antd-mobile";
import config from "../utils/config";

export default {
  namespace: "authorize",
  state: {
    pending: false,
    autoLogin: false,
    logged: window.localStorage.getItem(config.pkey) ? true : false,
  },

  subscriptions: {},

  effects: {
    *CheckToken({ payload }, { call, put }) {
      if(payload.userCode){
      Toast.loading("身份认证中...", 0);

      yield put({ type: "AutoLoginFn" });

      const { data, err, status } = yield call(CheckToken, {
        userCode: payload.userCode,
        platform: window.AppSetting.platform,
      });

      Toast.hide();

      if (status !== 200 && !payload.loginMethod) {
        Toast.fail(data.msg, 1);
        return;
      }

      if (data) {
        if (data.success) {
          window.localStorage.setItem(config.pkey, data.data);
          window.localStorage.setItem("userCode", payload.userCode);
          window.localStorage.setItem("loginTime", new Date().getTime());
          yield put({
            type: "Power",
          });
        } else {
          if (payload.loginMethod !== "自动") {
            Toast.fail("登录失败!");
          } else {
            Toast.fail(data.msg)
          }
        }

        yield put({
          type: "AutoLoginFn",
        });
      }

      if (err) {
        yield put({
          type: "AutoLoginFn",
        });
        Toast.fail("错误");
      }
    }
    },
    *Author({ payload }, { call, put }) {
      yield put({
        type: "Power",
      });
    },
    *CheckPey({ payload }, { call, put }) {
      const { data } = yield call(CheckPey, {
        pKey: window.localStorage.getItem(config.pkey),
      });
      if (!data) {
        window.localStorage.setItem(config.pkey, "");
        window.location.href = "/";
      }
    },
  },

  reducers: {
    AutoLoginFn(state, action) {
      return { ...state, autoLogin: !state.autoLogin };
    },
    Power(state, action) {
      return { ...state, logged: true };
    },
  },
};
