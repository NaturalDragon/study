import { combineReducers } from "redux";
import counterReducer from "../features/counter/counterSlice";
import logInfoReducer from "../logInfo/logInfoSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  logInfo: logInfoReducer,
});
export default rootReducer;
