import { CHANGE_BANNER_SUCCESS, CHANGE_RECOMMEND_LIST_SUCESS, CHANGE_ENTER_LOADING,
     CHANGE_RECOMMEND_LIST } from '../constants/index'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_BANNER_SUCCESS:
            return state.set('bannerList', action.data);
        case CHANGE_RECOMMEND_LIST_SUCESS:
            return state.set('recommendList', action.data)
        case CHANGE_ENTER_LOADING:
            return state.set('enterLoading',action.data)
        default:
            return state;
    }
}