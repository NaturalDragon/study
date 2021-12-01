import{combineReducers} from 'redux-immutable'
import recommendReducer from './recommend'
import singerReducer from './singer'
export default combineReducers({
    recommend:recommendReducer,
    singer:singerReducer
})