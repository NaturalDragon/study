import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile'

import config from './config'
import com from './common'
import { whiteRequest } from './Constants'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 *
 *
 * @param {string} url
 * @param {number} 超时时间
 * @returns
 */
function request_timeOut(url,options,wait=120000) {
  return new Promise((resolve, reject) => {
    let status = 0; // 0 等待 1 完成 2 超时
    let timer = setTimeout(() => {
    
      if (status === 0) {
        status = 2;
        timer = null;
        let errData={errorMessages:"系统超时"}
        resolve(errData);
      }
    }, wait);
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (status !== 2) {
          clearTimeout(timer);
          resolve(res);
          timer = null;
          status = 1;
        }
      });
  });
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  
  // 一天后自动退出
  if (!com.GetCookie("platform")) { // APP端
    if (!whiteRequest.includes(url)) { //请求白名单
      let exp = 24 * 60 * 60 * 1000
      if (new Date().getTime() - window.localStorage.getItem('loginTime') > exp && window.localStorage.getItem('loginTime')) {
        Toast.fail('')
        com.SetCookie(config.pkey, '')
        window.localStorage.setItem(config.pkey, '');
        window.localStorage.clear()
        window.location.href = "/invoice"
      } else {
        window.localStorage.setItem('loginTime', new Date().getTime())
      }
    }
  }

  // const token = com.GetPkey();
  const tokens = window.localStorage.getItem(config.pkey)
  // alert(`token: ${tokens}`)
  // alert(window.localStorage.getItem(config.pkey))
  // alert(token)
  if (options.headers) {
    options.headers['Accept'] = 'application/json';

    options.headers['Authorization'] = "Bearer " + tokens
    // options.headers['Authorization'] = `Bearer VBGTo+ V316zPKQXxEEPzr8oCqafQX + Ur6rp8rbf / aC2cMJdvzOjfGM4wZRB0WDTILT6vsR9co5yxVFIMQxn8CU6vrtB7l4Yjo6rsBWfa4CjMZPHQ5OHe4WwOMdgMstSNFiaMQ9fmzxjInnxpDjft3iLlRcBx94Yyjvtz6BGnGUj03u2nKiy43Y9 / 5KOOZJ43by10FTLI + xJZQ3lqbo9cfql3DeyQ0u8ZXZKD39xmojnA0k / BWKKFhygA1w1Scc1CHVRwfw1Z6UsNNvow6LuTnvajjlkcrPCndENCZKGXV5mnavCmv2 + LJXKZ4WjzH56ysnJW6SLSdewTz7CRM5UPpPGNGRE / uebmAj / hlzuZzdecOVPXsJVQHAYgpS4vrbtR`;

    //options.headers['Content-Type'] = 'application/json;charset=UTF-8';
  } else {
    options.headers = {
      // 'Accept': 'application/json,text/plain,*/*',
      //'Accept': 'application/json,text/plain,*/*',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',//'application/json',

      'Authorization': "Bearer " + tokens
      // 'Authorization': `Bearer VBGTo+ V316zPKQXxEEPzr8oCqafQX + Ur6rp8rbf / aC2cMJdvzOjfGM4wZRB0WDTILT6vsR9co5yxVFIMQxn8CU6vrtB7l4Yjo6rsBWfa4CjMZPHQ5OHe4WwOMdgMstSNFiaMQ9fmzxjInnxpDjft3iLlRcBx94Yyjvtz6BGnGUj03u2nKiy43Y9 / 5KOOZJ43by10FTLI + xJZQ3lqbo9cfql3DeyQ0u8ZXZKD39xmojnA0k / BWKKFhygA1w1Scc1CHVRwfw1Z6UsNNvow6LuTnvajjlkcrPCndENCZKGXV5mnavCmv2 + LJXKZ4WjzH56ysnJW6SLSdewTz7CRM5UPpPGNGRE / uebmAj / hlzuZzdecOVPXsJVQHAYgpS4vrbtR`
    }
  }


  let httpUrl;

  if (url.indexOf('http') > -1 || url.indexOf('http') > -1) {
    httpUrl = url;
  } else {
    httpUrl = window.AppSetting.openApiIp + url;
  }

  return fetch(`${httpUrl}`, options)
    .then(checkStatus)
   .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
