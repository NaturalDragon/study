import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { take, select } from "redux-saga/effects";
import { useDispatch } from "react-redux";
import rootReducer from "../reducers/index";
import rootSaga from "../sagas/index";
// const sagaMiddleware=createSagaMiddleware();

// const store=createStore(
//   rootReducer,
//   applyMiddleware(sagaMiddleware)
// )
// sagaMiddleware.run(rootSaga)

// export default store;
const baseMiddleware = getDefaultMiddleware<RootState>();
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [...baseMiddleware, sagaMiddleware],
});
sagaMiddleware.run(function* () {
  console.log("saga is running!");
  while (true) {
    let action = yield take("*");
    const state = yield select();
    // console.log("take a action!", action);
    //console.log("state after", state);
  }
});
sagaMiddleware.run(rootSaga);
// sagas.forEach((saga) => {
//   sagaMiddleware.run(saga, store);
// });
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
