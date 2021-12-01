import {
    CHANGE_SONGS_OF_ARTIST, CHANGE_SONGS_OF_ARTIST_SUCCESS,
    CHANGE_ALPHA, CHANGE_CATOGORY
} from '../constants/index'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    category: '',
    alpha: '',
    artistList: []
})

export default (state = defaultState, action) => {
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
        case CHANGE_SONGS_OF_ARTIST_SUCCESS:
            return state.set('artistList', action.data)
        default:
            return state;
    }
}
