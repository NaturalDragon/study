import { all } from "redux-saga/effects";
import { saga as logInfoSaga } from "../logInfo/logInfoSlice";
// export default function* rootSaga() {
//   yield all([logInfoSaga]);
// }

export const sagas = [logInfoSaga];
