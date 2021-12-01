import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login";
import config from "../utils/config";
import com from "../utils/common";
class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    let { pending, logged, autoLogin } = this.props.authorize;
    let token = com.GetQueryUrlString(this.props.location.search, "token");
    let userCode = window.localStorage.getItem("userCode");
    // if (token && userCode !== token) {
    //   window.localStorage.setItem(config.pkey, "");
    // }
    let key = window.localStorage.getItem(config.pkey);

    if (!key) {
      return (
        <Route
          {...rest}
          render={(props) => {
            return <Login {...props} autoLogin={autoLogin} />;
          }}
        />
      );
    } else {
      return (
        <Route
          {...rest}
          render={(props) => {
            if (pending) return <div>Loading...</div>;
            return logged ? (
              <Component {...props} />
            ) : (
              <Login {...props} autoLogin={autoLogin} />
            );
          }}
        />
      );
    }
  }
}

function mapStateToProp({ authorize }) {
  return { authorize };
}
export default connect(mapStateToProp)(AuthorizedRoute);
