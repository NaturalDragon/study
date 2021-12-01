import { call,  takeEvery, put } from 'redux-saga/effects'
import { changeEnterLoading,getArtistInfoSuccess } from '../actions/singerInfo'
import { CHANGE_SONGS_INFO_ARTIST } from '../constants/index'
import { getSingerInfoRequest } from '../services/singerInfo'

function* getArtistData({id}) {
    yield put(changeEnterLoading(true))
    console.log(id)
    const { data } = yield call(getSingerInfoRequest, id)
    if (data) {
        yield put(changeEnterLoading(false))
        yield put(getArtistInfoSuccess(data))
    }
}

export default function* watchFetch() {
    yield takeEvery(CHANGE_SONGS_INFO_ARTIST, getArtistData)
}