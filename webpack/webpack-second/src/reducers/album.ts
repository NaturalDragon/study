/** @format */

import {CHANGE_CURRENT_ALBUM_SUCCESS, CHANGE_ALBUM_ENTER_LOADING} from '../constants'
import {fromJS} from 'immutable'
import {ActionTypes} from '@/interfaces/album'
const defaultState = fromJS({
    currentAlbum: {},
    enterLoading: true,
})

export default (state = defaultState, action: ActionTypes) => {
    switch (action.type) {
        case CHANGE_ALBUM_ENTER_LOADING:
            return state.set('enterLoading', action.data)
        case CHANGE_CURRENT_ALBUM_SUCCESS:
            return state.set('currentAlbum', action.data)
        default:
            return state
    }
}
