
import {all} from 'redux-saga/effects'
import recommmendModel from './recommend'
import singerModel from './singer'
export default function* rootSaga() {
    yield all([
        recommmendModel(),
        singerModel()
    ])
};