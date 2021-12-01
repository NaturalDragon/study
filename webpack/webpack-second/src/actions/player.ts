/** @format */

import {
    SET_CURRENT_SONG,
    SET_FULL_SCREEN,
    SET_PLAYING_STATE,
    SET_SEQUECE_PLAYLIST,
    SET_PLAYLIST,
    SET_PLAY_MODE,
    SET_CURRENT_INDEX,
    SET_SHOW_PLAYLIST,
} from '../constants'
import {fromJS} from 'immutable'
import {makeActionCreator} from '../api/utils'
//import{} from '@/interfaces/player'
import {ISongData} from '@/interfaces/song'
export const changeCurrentSong = (data: ISongData) => {
    return {
        type: SET_CURRENT_SONG,
        data: fromJS(data),
    }
}

export const changeFullScreen = makeActionCreator(SET_FULL_SCREEN, 'data')

export const changePlayingState = makeActionCreator(SET_PLAYING_STATE, 'data')

export const changeSequecePlayList = (data: Array<ISongData>) => ({
    type: SET_SEQUECE_PLAYLIST,
    data: fromJS(data),
})

export const changePlayList = (data: Array<ISongData>) => ({
    type: SET_PLAYLIST,
    data: fromJS(data),
})

export const changePlayMode = makeActionCreator(SET_PLAY_MODE, 'data')

export const changeCurrentIndex = makeActionCreator(SET_CURRENT_INDEX, 'data')

export const changeShowPlayList = makeActionCreator(SET_SHOW_PLAYLIST, 'data')
