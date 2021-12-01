import {combineReducers} from 'redux';
import todos from './todo' 
import {selectedSubreddit,postsBySubreddit} from './reddit'
export default combineReducers({
    todos,
    selectedSubreddit,
    postsBySubreddit
  })
  