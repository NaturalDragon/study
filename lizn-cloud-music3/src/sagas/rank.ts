/** @format */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeEvery, put } from "redux-saga/effects";
import { getRankRequest } from "@/services/rank";
import {
  changeRankListAction,
  changeEnterLoading,
  changeRankListSuccess,
} from "@/slice/rankSlice";
function* getRankList(action: PayloadAction<any>) {
  yield put(changeEnterLoading(true));

  const { data } = yield call(getRankRequest);
  if (data) {
    yield put(changeEnterLoading(false));
    yield put(changeRankListSuccess(data.list));
  }
}

export default function* watchFetch() {
  yield takeEvery(changeRankListAction, getRankList);
}
