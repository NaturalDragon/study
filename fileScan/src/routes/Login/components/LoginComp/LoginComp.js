import React from "react";
import config from "../../../../utils/config";

import { Button, Toast } from "antd-mobile";
import styles from "./LoginComp.less";

export default class LoginComp extends React.Component {
  generateGetCodeUrl(redirectURL) {
    var wxUrl =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      config.appId +
      "&redirect_uri=" +
      redirectURL +
      "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    return wxUrl;
  }
  componentDidMount() {
    // var code = com.GetQueryString('code');
    // var state = com.GetQueryString('state');
    //  alert(window.location.href)
    this.props.LoginAuto();
  }
  Submit = () => {
    let loginInfo = this.props.loginInfo;
    if (!loginInfo.userName) {
      Toast.fail("请输入账号");
      return;
    }
    if (!loginInfo.password) {
      Toast.fail("请输入账号密码");
      return;
    }
    this.props.LoginAuthor(loginInfo);
  };

  handleBug() {
    let scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }

  render() {
    const { loginInfo, autoLogin } = this.props;
    return (
      <div>
        {!autoLogin && (
          <div className={styles.loginWrap}>
            <div className={styles.loginBac}></div>
            <div className={styles.optWrap}>
              <div className={styles.title}>用户登录</div>
              <div className={styles.optItem}>
                <div className={`${styles.optIcon} ${styles.user}`}></div>
                <div className={styles.optInput}>
                  <input
                    onChange={(e) =>
                      this.props.SetData({ userName: e.target.value })
                    }
                    value={loginInfo.userName}
                    placeholder="请输入账号"
                    onBlur={this.handleBug}
                  />
                </div>
              </div>
              <div className={styles.optItem}>
                <div className={`${styles.optIcon} ${styles.pwd}`}></div>
                <div className={styles.optInput}>
                  <input
                    onChange={(e) =>
                      this.props.SetData({ password: e.target.value })
                    }
                    value={loginInfo.password}
                    type="password"
                    placeholder="请输入账号密码"
                    onBlur={this.handleBug}
                  />
                </div>
              </div>

              <div className={styles.desc}>
                说明:若忘记账号或者密码请联系本公司管理员
              </div>

              <div
                style={{
                  marginTop: 40,
                }}
              >
                <Button
                  onClick={this.Submit}
                  style={{
                    background: "#4C98FF",
                    color: "#fff",
                    borderRadius: "100px",
                  }}
                >
                  登录
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
