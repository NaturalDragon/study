import {
    CHANGE_SONGS_OF_ARTIST, CHANGE_SONGS_OF_ARTIST_PULLUP,CHANGE_SONGS_OF_ARTIST_PULLDOWN, CHANGE_SONGS_OF_ARTIST_SUCCESS,

} from '@/constants/index'
import {  getSingerListRequest } from '@/services/singer'
import { setOffsetCount, changeArtistListSuccess, pullupChange, pulldownChange ,enterloadingChange} from '@/actions/singer'
import { call, put, takeEvery, select } from 'redux-saga/effects'


function* getArtistList() {
    yield put(enterloadingChange(true))
    const state = yield select()
    const category = state.getIn(['singer', 'category'])
    const type = state.getIn(['singer', 'type'])
    const alpha = state.getIn(['singer', 'alpha'])
    const { data } = yield call(getSingerListRequest, type,category, alpha, 0)
    if (data) {
        yield put(changeArtistListSuccess(data.artists));
        yield put(setOffsetCount(data.artists.length))
        yield put(enterloadingChange(false))
    }
};

function* refreshInitSingerList() {
    yield put(pulldownChange(true))
    const state = yield select()
    const category = state.getIn(['singer', 'category'])
    const type = state.getIn(['singer', 'type'])
    const alpha = state.getIn(['singer', 'alpha'])
    const { data } = yield call(getSingerListRequest, type,category, alpha, 0)
    if (data) {
        yield put(pulldownChange(false))
        yield put(changeArtistListSuccess(data.artists));
        yield put(setOffsetCount(data.artists.length))
    }
}

function* refreshMoreSingerList() {
    yield put(pullupChange(true))
    const state = yield select()
    const category = state.getIn(['singer', 'category'])
    const type = state.getIn(['singer', 'type'])
    const alpha = state.getIn(['singer', 'alpha'])
    const listOffset = state.getIn(['singer', 'listOffset'])
    const artistList = state.getIn(['singer', 'artistList']);
    const artistListJS = artistList.toJS();
    const { data } = yield call(getSingerListRequest,type, category, alpha, listOffset)
    if (data) {
        let newData = artistListJS.concat(data.artists);
        yield put(pullupChange(false))
        yield put(changeArtistListSuccess(newData));
        yield put(setOffsetCount(newData.length))
    }
}
export default function* watchFetch() {
    yield takeEvery(CHANGE_SONGS_OF_ARTIST, getArtistList)
    yield takeEvery(CHANGE_SONGS_OF_ARTIST_PULLDOWN,refreshInitSingerList)
    yield takeEvery(CHANGE_SONGS_OF_ARTIST_PULLUP, refreshMoreSingerList)


}
