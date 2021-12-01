import {fromJS} from 'immutable'
import {CHANGE_CATOGORY,CHANGE_ALPHA,CHANGE_SONGS_OF_ARTIST,CHANGE_SONGS_OF_ARTIST_SUCCESS} from '../constants/index'

export const changeCategory=data=>{
    return {
        type:CHANGE_CATOGORY,
        data
    }
}
export const changeAlpha=data=>{
    return {
        type:CHANGE_ALPHA,
        data
    }
}

export const changeArtistList=()=>{
    return {
        type:CHANGE_SONGS_OF_ARTIST
    }
}
export const changeArtistListSuccess=(data)=>{
    return {
        type:CHANGE_SONGS_OF_ARTIST_SUCCESS,
        data:fromJS(data)
    }
}