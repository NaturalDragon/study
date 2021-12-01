import { CHANGE_CURRENT_ALBUM_SUCCESS,CHANGE_CURRENT_ALBUM, CHANGE_ALBUM_ENTER_LOADING } from '../constants'
import {makeActionCreator} from './../api/utils'
import {fromJS} from 'immutable'
export const changeEnterLoading=makeActionCreator(CHANGE_ALBUM_ENTER_LOADING,'data');
export const getAlbumData=makeActionCreator(CHANGE_CURRENT_ALBUM,'id')
export const getAlbumDataSuccess=(data)=>{
    return{
        type:CHANGE_CURRENT_ALBUM_SUCCESS,
        data:fromJS(data)
    }
}