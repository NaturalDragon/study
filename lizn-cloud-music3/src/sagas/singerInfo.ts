/** @format */

import { call, takeEvery, put } from "redux-saga/effects";
import {
  changeEnterLoading,
  changeArtistInfoAction,
  changeArtistInfoSuccess,
} from "@/slice/singerInfoSlice";
import { getSingerInfoRequest } from "@/services/singerInfo";
import { PayloadAction } from "@reduxjs/toolkit";
import { ISingerParam } from "@/interfaces/singerInfo";

function* getArtistData(action: PayloadAction<ISingerParam>) {
  yield put(changeEnterLoading(true));
  const { data } = yield call(getSingerInfoRequest, action.payload.id);
  if (data) {
    yield put(changeEnterLoading(false));
    yield put(changeArtistInfoSuccess(data));
  }
}

export default function* watchFetch() {
  yield takeEvery(changeArtistInfoAction, getArtistData);
}
