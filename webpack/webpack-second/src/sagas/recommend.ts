/** @format */

import {call, put, takeEvery, all} from 'redux-saga/effects'
import {CHANGE_BANNER, CHANGE_RECOMMEND_LIST} from '@/constants/index'
import {changeBannerListSuccess, changeRecommendListSuccess, changeEnterLoading} from '@/actions/recommend'
import {getBannerRequest, getRecommendListRequest} from '@/services/recommend'

function* getBannerList() {
    const {data} = yield call(getBannerRequest)
    if (data) {
        yield put(changeBannerListSuccess(data.banners))
    }
}

function* getRecommendList() {
    const {data} = yield call(getRecommendListRequest)
    if (data) {
        yield put(changeRecommendListSuccess(data.result))
        yield put(changeEnterLoading(false))
    }
}
export default function* watchFetch() {
    yield takeEvery(CHANGE_BANNER, getBannerList)
    yield takeEvery(CHANGE_RECOMMEND_LIST, getRecommendList)
}
