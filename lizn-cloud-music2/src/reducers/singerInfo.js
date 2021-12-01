import { CHANGE_SINGERINFO_ENTER_LOADING, CHANGE_SONGS_INFO_ARTIST_SUCCESS } from '../constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    artistInfo: {
        artist:{
            name:'',
            picUrl:''
        },
        hotSongs:[]
    },
    enterLoading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_SINGERINFO_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case CHANGE_SONGS_INFO_ARTIST_SUCCESS:
            return state.set('artistInfo', action.data)
        default:
            return state;
    }
}