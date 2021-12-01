import { all } from "redux-saga/effects";
import recommmendModel from "./recommend";
import singerModel from "./singer";
import albumModel from "./album";
import singerInfoModel from "./singerInfo";
import rankModel from "./rank";
export default function* rootSaga() {
  yield all([
    recommmendModel(),
    singerModel(),
    albumModel(),
    singerInfoModel(),
    rankModel(),
  ]);
}
