/** @format */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeEvery, put } from "redux-saga/effects";
import { getAlbumDetailRequest } from "@/services/album";
import { IAlbumParam } from "@/interfaces/album";
import {
  changeCurrentAlbumAction,
  changeEnterLoading,
  changeCurrentAlbumSuccess,
} from "@/slice/albumSlice";
function* getAlbumList(action: PayloadAction<IAlbumParam>) {
  yield put(changeEnterLoading(true));

  const { data } = yield call(getAlbumDetailRequest, action.payload.id);
  if (data) {
    yield put(changeEnterLoading(false));
    yield put(changeCurrentAlbumSuccess(data.playlist));
  }
}

export default function* watchFetch() {
  yield takeEvery(changeCurrentAlbumAction, getAlbumList);
}
