import {fromJS} from 'immutable'
import {makeActionCreator} from '../api/utils'
import {CHANGE_SINGER_ENTER_LOADING,CHANGE_PULLDOWN_LOADING,CHANGE_PULLUP_LOADING,CHANGE_LIST_OFFSET,CHANGE_CATOGORY,CHANGE_SONGS_OF_ARTIST_PULLUP,CHANGE_SONGS_OF_ARTIST_PULLDOWN,
    CHANGE_TYPE, CHANGE_ALPHA,CHANGE_SONGS_OF_ARTIST,CHANGE_SONGS_OF_ARTIST_SUCCESS} from '../constants/index'



// export const changeCategory=data=>{
//     return {
//         type:CHANGE_CATOGORY,
//         data
//     }
// }

export const changeCategory=makeActionCreator(CHANGE_CATOGORY,'data')
export const changeAlpha=makeActionCreator(CHANGE_ALPHA,'data')
export const changeType=makeActionCreator(CHANGE_TYPE,'data')
export const setOffsetCount=makeActionCreator(CHANGE_LIST_OFFSET,'data')

export const changeArtistList=makeActionCreator(CHANGE_SONGS_OF_ARTIST)

export const changeArtistListSuccess=(data)=>{
    return {
        type:CHANGE_SONGS_OF_ARTIST_SUCCESS,
        data:fromJS(data)
    }
}
export const refreshInitSingerList=makeActionCreator(CHANGE_SONGS_OF_ARTIST_PULLDOWN)

export const refreshMoreSingerList=makeActionCreator(CHANGE_SONGS_OF_ARTIST_PULLUP)

export const pulldownChange=makeActionCreator(CHANGE_PULLDOWN_LOADING,'data')

export const pullupChange=makeActionCreator(CHANGE_PULLUP_LOADING,'data')

export const enterloadingChange=makeActionCreator(CHANGE_SINGER_ENTER_LOADING,'data')
