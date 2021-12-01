import {
    CHANGE_SONGS_OF_ARTIST_SUCCESS,
    CHANGE_ALPHA, CHANGE_CATOGORY,CHANGE_TYPE,
    CHANGE_SINGER_ENTER_LOADING,
    CHANGE_PULLDOWN_LOADING, CHANGE_PULLUP_LOADING, CHANGE_LIST_OFFSET
} from '@/constants/index'
import { fromJS } from 'immutable'
import {ActionTypes} from '@/interfaces/singer'
const defaultState = fromJS({
    category: '',
    alpha: '',
    type:'',
    artistList: [],
    enterLoading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    listOffset: 0
})

export default (state = defaultState, action:ActionTypes) => {
    switch (action.type) {
        case CHANGE_CATOGORY:
            return state.merge({
                'category': action.data,
                listOffset: 0,
                enterLoading: true
            })
        case CHANGE_ALPHA:
            return state.merge({
                'alpha': action.data,
                listOffset: 0,
                enterLoading: true
            })
        case CHANGE_TYPE:
            return state.merge({
                type:action.data,
                listOffset: 0,
                enterLoading: true
            })
        case CHANGE_LIST_OFFSET:
            return state.set('listOffset', action.data);
        case CHANGE_SINGER_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case CHANGE_SONGS_OF_ARTIST_SUCCESS:
            return state.set('artistList', action.data)
        case CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data);
        case CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data);
        default:
            return state;
    }
}
