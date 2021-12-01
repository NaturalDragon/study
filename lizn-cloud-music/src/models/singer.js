import {CHANGE_SONGS_OF_ARTIST,CHANGE_SONGS_OF_ARTIST_SUCCESS} from '../constants/index'
import{getHotSingerListRequest} from '../services/singer'
import {changeArtistList,changeArtistListSuccess} from '../actions/singer'
import {call,put,takeEvery} from 'redux-saga/effects'


function* getArtistList() {
    const { data } = yield call(getHotSingerListRequest, {offset:0})
    if (data) {
        yield put(changeArtistListSuccess(data.artists));
    }
};


export default function* watchFetch() {
    yield takeEvery(CHANGE_SONGS_OF_ARTIST, getArtistList)
}
