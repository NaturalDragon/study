import { connect } from "dva";

import { LoginComp } from "./components";
import com from "../../utils/common";
import encode from "../../utils/Encode";

function Login(props) {
  const { location, login, dispatch, autoLogin } = props;
  const { MapData, IsRegister, loginInfo } = login;
  const LoginProps = {
    autoLogin,
    MapData: MapData,
    IsRegister: IsRegister,
    loginInfo,
    LoginAuto() {
      let userCode = com.GetQueryUrlString(location.search, "token");
      dispatch({
        type: "authorize/CheckToken",
        payload: { userCode: userCode, loginMethod: "自动" },
      });
    },

    LoginAuthor(payload) {
     
      dispatch({
        type: "login/LoginAuthor",
        payload: {
          info: {
            ...payload,
          },
         
        },
      });
    },
    SetData(obj) {
      dispatch({
        type: "login/SetData",
        payload: { obj },
      });
    },
    Register(data) {
      dispatch({
        type: "login/Register",
        payload: data,
      });
    },
    TestLogin() {
      dispatch({
        type: "login/TestLogin",
      });
    },
    ToEdit() {},
  };
  return <LoginComp {...LoginProps} />;
}

function mapStateToProp({ login }) {
  return { login };
}
export default connect(mapStateToProp)(Login);
