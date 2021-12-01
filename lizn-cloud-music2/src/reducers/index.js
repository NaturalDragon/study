import{combineReducers} from 'redux-immutable'
import recommendReducer from './recommend'
import singerReducer from './singer'
import albumReducer from './album'
import singerInfoReducer from './singerInfo'
import playerReducer from './player'
export default combineReducers({
    recommend:recommendReducer,
    singer:singerReducer,
    album:albumReducer,
    singerInfo:singerInfoReducer,
    player:playerReducer
})