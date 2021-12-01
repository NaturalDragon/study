/** @format */

import {CHANGE_SONGS_INFO_ARTIST, CHANGE_SONGS_INFO_ARTIST_SUCCESS, CHANGE_SINGERINFO_ENTER_LOADING} from '@/constants'
import {makeActionCreator} from '@/api/utils'
import {fromJS} from 'immutable'
import {IArtistInfo} from '@/interfaces/singerInfo'
export const changeEnterLoading = makeActionCreator(CHANGE_SINGERINFO_ENTER_LOADING, 'data')
export const getArtistInfo = makeActionCreator(CHANGE_SONGS_INFO_ARTIST, 'id')
export const getArtistInfoSuccess = (data: IArtistInfo) => {
    return {
        type: CHANGE_SONGS_INFO_ARTIST_SUCCESS,
        data: fromJS(data),
    }
}
