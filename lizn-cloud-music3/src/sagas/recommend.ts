/** @format */

import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "@/services/recommend";
import {
  changeEnterLoading,
  getBannerListAction,
  getBannerListSuccess,
  getRecommendListAction,
  getRecommendListSuccess,
} from "@/slice/recommendSlice";
function* getBannerList() {
  const { data } = yield call(getBannerRequest);
  if (data) {
    yield put(getBannerListSuccess(data.banners));
  }
}

function* getRecommendList() {
  const { data } = yield call(getRecommendListRequest);
  if (data) {
    yield put(getRecommendListSuccess(data.result));
    yield put(changeEnterLoading(false));
  }
}
export default function* watchFetch() {
  yield takeEvery(getBannerListAction, getBannerList);
  yield takeEvery(getRecommendListAction, getRecommendList);
}
