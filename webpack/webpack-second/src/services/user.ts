import request from '../utils/request'


export function GetUserList(params:any) {
  return request(`http://127.0.0.1:5009/api/User/GetUserList`, {
    method: "GET",
    mode: 'cors',
    traditional: true,
  //  body: JSON.stringify(params),
  });
}
export function Login(params:any) {
  return request(`http://127.0.0.1:5009/api/User/Login`, {
    method: "POST",
    mode: 'cors',
    traditional: true,
   body: JSON.stringify(params),
  });
}
export function Search(params:any) {
  return request(`http://127.0.0.1:5009/api/User/Search`, {
    method: "POST",
    mode: 'cors',
    traditional: true,
   body: JSON.stringify(params),
  });
}

export function TestChannel(params:any) {
  return request(`http://127.0.0.1:5009/api/User/TestChannel`, {
    method: "POST",
    mode: 'cors',
    traditional: true,
   body: JSON.stringify(params),
  });
}

export function storeItem(token:any):boolean{
    localStorage.setItem('token',token);
    return true
}

export function clearItem():boolean{
  console.log('clearItem')
  localStorage.clear();
  return true
}