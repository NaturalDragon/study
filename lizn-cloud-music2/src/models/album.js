import { call,  takeEvery, put } from 'redux-saga/effects'
import { changeEnterLoading,getAlbumDataSuccess } from '../actions/album'
import { CHANGE_CURRENT_ALBUM } from '../constants/index'
import { getAlbumDetailRequest } from '../services/album'

function* getAlbumList({id}) {
    yield put(changeEnterLoading(true))
    console.log(id)
    const { data } = yield call(getAlbumDetailRequest, id)
    if (data) {
       
        yield put(changeEnterLoading(false))
        yield put(getAlbumDataSuccess(data.playlist))
    }
}

export default function* watchFetch() {
    yield takeEvery(CHANGE_CURRENT_ALBUM, getAlbumList)
}