/** @format */
import { combineReducers } from "redux";
import recommendReducer from "@/slice/recommendSlice";
import singerReducer from "@/slice/singerSlice";
import albumReducer from "@/slice/albumSlice";
import singerInfoReducer from "@/slice/singerInfoSlice";
import playerReducer from "@/slice/playerSlice";
import rankReducer from "@/slice/rankSlice";
const rootReducer = combineReducers({
  //user:userdReducer,
  recommend: recommendReducer,
  singer: singerReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
  rank: rankReducer,
});
export default rootReducer;
