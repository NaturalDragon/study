/** @format */

import {combineReducers} from 'redux-immutable'
//import userdReducer from './user'
import recommendReducer from './recommend'
import singerReducer from './singer'
import albumReducer from './album'
import singerInfoReducer from './singerInfo'
import playerReducer from './player'
// import
const rootReducer = combineReducers({
    //user:userdReducer,
    recommend: recommendReducer,
    singer: singerReducer,
    album: albumReducer,
    singerInfo: singerInfoReducer,
    player: playerReducer,
})
export default rootReducer
