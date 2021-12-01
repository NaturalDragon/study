import { getSingerListRequest } from "@/services/singer";
import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  changeEnterLoading,
  changeAlpha,
  changeArtistListAction,
  changeArtistListSuccess,
  changeCategory,
  changePullDownLoading,
  changePullUpLoading,
  changeType,
  changeListOffset,
  refreshInitSingerList,
  refreshMoreSingerList,
} from "@/slice/singerSlice";

function* getArtistList() {
  yield put(changeEnterLoading(true));
  const state = yield select();
  const {
    singer: { category, type, alpha },
  } = state;
  //   const category = state.getIn(["singer", "category"]);
  //   const type = state.getIn(["singer", "type"]);
  //   const alpha = state.getIn(["singer", "alpha"]);
  const { data } = yield call(getSingerListRequest, type, category, alpha, 0);
  if (data) {
    yield put(changeArtistListSuccess(data.artists));
    yield put(changeListOffset(data.artists.length));
    yield put(changeEnterLoading(false));
  }
}

function* refreshInitSingerListAsync() {
  yield put(changePullDownLoading(true));
  const state = yield select();
  const {
    singer: { category, type, alpha },
  } = state;
  //   const category = state.getIn(["singer", "category"]);
  //   const type = state.getIn(["singer", "type"]);
  //   const alpha = state.getIn(["singer", "alpha"]);
  const { data } = yield call(getSingerListRequest, type, category, alpha, 0);
  if (data) {
    yield put(changePullDownLoading(false));
    yield put(changeArtistListSuccess(data.artists));
    yield put(changeListOffset(data.artists.length));
  }
}

function* refreshMoreSingerListAsync() {
  yield put(changePullUpLoading(true));
  const state = yield select();
  const {
    singer: { category, type, alpha, listOffset, artistList },
  } = state;
  //   const category = state.getIn(["singer", "category"]);
  //   const type = state.getIn(["singer", "type"]);
  //   const alpha = state.getIn(["singer", "alpha"]);
  //   const listOffset = state.getIn(["singer", "listOffset"]);
  //   const artistList = state.getIn(["singer", "artistList"]);
  const artistListJS = artistList;
  const { data } = yield call(
    getSingerListRequest,
    type,
    category,
    alpha,
    listOffset
  );
  if (data) {
    let newData = artistListJS.concat(data.artists);
    yield put(changePullUpLoading(false));
    yield put(changeArtistListSuccess(newData));
    yield put(changeListOffset(newData.length));
  }
}
export default function* watchFetch() {
  yield takeEvery(changeArtistListAction, getArtistList);
  yield takeEvery(refreshInitSingerList, refreshInitSingerListAsync);
  yield takeEvery(refreshMoreSingerList, refreshMoreSingerListAsync);
}
