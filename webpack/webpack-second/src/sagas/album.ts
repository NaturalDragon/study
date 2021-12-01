/** @format */

import {call, takeEvery, put} from 'redux-saga/effects'
import {changeEnterLoading, getAlbumDataSuccess} from '../actions/album'
import {CHANGE_CURRENT_ALBUM} from '@/constants/index'
import {getAlbumDetailRequest} from '@/services/album'
import {IAlbumParam} from '@/interfaces/album'
function* getAlbumList(payload: any) {
    yield put(changeEnterLoading(true))

    const {data} = yield call(getAlbumDetailRequest, payload.id)
    if (data) {
        yield put(changeEnterLoading(false))
        yield put(getAlbumDataSuccess(data.playlist))
    }
}

export default function* watchFetch() {
    yield takeEvery(CHANGE_CURRENT_ALBUM, getAlbumList)
}
