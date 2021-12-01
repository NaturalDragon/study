/** @format */

import {call, takeEvery, put} from 'redux-saga/effects'
import {changeEnterLoading, getArtistInfoSuccess} from '@/actions/singerInfo'
import {CHANGE_SONGS_INFO_ARTIST} from '@/constants/index'
import {getSingerInfoRequest} from '@/services/singerInfo'

function* getArtistData(payload: any) {
    yield put(changeEnterLoading(true))
    console.log(payload.id)
    const {data} = yield call(getSingerInfoRequest, payload.id)
    if (data) {
        yield put(changeEnterLoading(false))
        yield put(getArtistInfoSuccess(data))
    }
}

export default function* watchFetch() {
    yield takeEvery(CHANGE_SONGS_INFO_ARTIST, getArtistData)
}
