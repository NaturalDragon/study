import React, { useEffect } from 'react';
import { LoginResultInterface } from "../interfaces/user";
import { getUserList, login, login_out } from '../actions/index'
export default class Login extends React.Component<LoginResultInterface>{
    loginBtn = () => {
        const { dispatch } = this.props;
        dispatch(login('admin', '123456'))
    }
    loginOutBtn = () => {
        const { dispatch } = this.props;
        dispatch(login_out())
    }
    render() {
        const { loginStatu, loginMessage } = this.props
        return (
            <div>
                <div>{loginMessage}</div>
              {
                    <button onClick={this.loginBtn} >登录</button>
              }

                {
                    <button onClick={this.loginOutBtn}> 退出</button>
                }
            </div>
        )
    }
}