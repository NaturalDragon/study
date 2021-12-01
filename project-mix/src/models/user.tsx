import { fork, select, takeEvery, take, call, put, takeLatest, cancel, cancelled, all, delay, actionChannel, race, throttle, debounce
 } from 'redux-saga/effects'
 import {buffers} from 'redux-saga'
import { GetUserList, Login, storeItem, clearItem ,TestChannel,Search} from '../services/user'
import {
    GET_USERLIST, LOGIN_REQUEST, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL,
    START_BACKGROUD_TASK, STOP_BACKGROUD_TASK,TEST_CHANNEL,
    login_success, login_fail, login_out, getUserSuccess
    , login_out_success, start_background_task, stop_background_task,
    getUserList,test_channel, SEARCH
} from '../actions/index'

function* fetchUsers() {
    const { data } = yield call(GetUserList, {})
    if (data) {
        yield put(getUserSuccess(data))
    }
}


function* fetchUserTimeout() {
    const { posts, timeout } = yield race(
        {
            posts: call(GetUserList, {}),
            timeout: delay(10)
        }
    )
    if (posts) {
        yield put(getUserSuccess(posts.data))
    } else {
        console.log('超时了')
    }
}

function* fetchAll(){
    const { posts, loginres } = yield all(
        {
            posts: call(GetUserList, {}),
            loginres: call(Login,{})
        }
    )
    debugger
}
function* watchFetchUsers() {
    yield takeEvery(GET_USERLIST, fetchUsers)
}

// function* watchAndLog(){
//         yield takeEvery('*',function*logger(action){
//                 const state=yield select();
//                 console.log('action',action);
//                 console.log('state',state)
//         })
// }
function* watchAndLog2() {
    while (true) {
        const action = yield take('*');
        const state = yield select();
        console.log('action', action);
        console.log('state', state)

    }
}
/*阻塞调用
*/
/*
function*authorize(name:string,password:string):any{
     yield delay(4000)
     const {data}=yield call(Login,{name,password})
     if(data&&data.success){
         yield put(login_success())
         return data.data;
     }else{
         yield put(login_fail())
         return "";
     }
}
function* loginFlow(){
    while(true){
        const {name,password}=yield take(LOGIN_REQUEST);
        const token=yield authorize(name,password);
        if(token){
           yield call(storeItem,token)
           yield take(LOGOUT)
           yield call(clearItem);
           yield put(login_out_success())
        }
    }
}
*/
/*
无阻塞调用
*/
/**/
function* authorize(name: string, password: string) {
    try {
        yield delay(4000)
        const { data } = yield call(Login, { name, password })
        if (data && data.success) {
            yield put(login_success())
            yield call(storeItem, data.data)
        } else {
            yield put(login_fail())
        }
    }
    catch (ex) {

    }
    finally {
        if (yield cancelled()) {
            console.log('大爷被取消了，干点啥呢')
        }
    }


}
function* loginFlow() {
    while (true) {
        const { name, password } = yield take(LOGIN_REQUEST);
        const task = yield fork(authorize, name, password);
        const action = yield take([LOGOUT, LOGIN_FAIL]);
        if (action.type === LOGOUT) {
            yield cancel(task)
        }
        yield call(clearItem);
        //yield put(login_out_success())
    }
}


function* bgSync() {
    try {
        while (true) {
            const { data } = yield call(GetUserList, {});
            console.log(data)
            yield delay(2000)
        }
    }
    finally {
        if (yield cancelled()) {
            console.log('取消')
        }
    }
}
function* main() {
    if (yield take(START_BACKGROUD_TASK)) {
        const bg_task = yield fork(bgSync);

        yield take(STOP_BACKGROUD_TASK)

        yield cancel(bg_task)
    }
}

function* handleRquest(params:any){
     const {data}=yield call(TestChannel,{...params})
}
function* watchRequest(){
    // while(true){
    //     const param=yield take(TEST_CHANNEL);
    //     yield fork(handleRquest,param)
    // }

    const requestChannel=yield actionChannel(TEST_CHANNEL,buffers.sliding(3))

    while(true){
       
        const params=yield take(requestChannel);
        yield call(handleRquest,params)
    }
}
function* handleSearch(){
    const d=yield call(Search,{});

}

/**
 * 节流
 */
function* watchSearchThrottle(){
    yield throttle(1000,SEARCH,handleSearch)
}
/**
 * 防抖
 */
function*watchSearchDeb(){
    yield debounce(1000,SEARCH,handleSearch)
}

function* handleSearchDelay(pa:any){
    yield delay(1000);
    const d=yield call(Search,{...pa});
}

function*watchSearchDelay2(){
    let task;
    while(true){
        const {keywords}=yield take(SEARCH);
        if(task){
            yield cancel(task)
        }
        task=yield fork(handleSearchDelay,{name:keywords})
    }
}
function* watchSearchDelay3(){
    const {keywords}=yield take(SEARCH);
    debugger
    yield takeLatest(SEARCH,handleSearchDelay,{name:keywords})
}

export default function* rootSaga() {

    yield all([
        watchFetchUsers(),
        watchAndLog2(),
        loginFlow(),
        main(),
        watchRequest(),
        watchSearchDelay2()
    ])
};