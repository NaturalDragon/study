/** @format */

import {GET_USER_SUCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGINOUT_SUCCESS} from '../actions/index'
const user = (state = {list: [] as any[], loginStatu: false, loginMessage: ''}, action: any) => {
    switch (action.type) {
        case GET_USER_SUCESS:
            return {...state, list: action.list}
        case LOGIN_SUCCESS:
            return {...state, loginStatu: true, loginMessage: '登录成功'}
        case LOGIN_FAIL:
            return {...state, loginStatu: false, loginMessage: '登录失败'}
        case LOGINOUT_SUCCESS:
            return {...state, loginStatu: false, loginMessage: '退出成功'}
        default:
            return state
    }
}
export default user
