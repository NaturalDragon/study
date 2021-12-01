/** @format */

import {Record} from 'immutable'
import {ISongData} from './song'
import {RouteComponentProps} from 'react-router'
import {match} from 'react-router-dom'
import * as action from '@/constants'
export interface IAblumProps extends RouteComponentProps {
    currentAlbum: Record<IAlbumData>
    enterLoading: boolean
    getAlbumDataDispatch: Function
    match: match<IAlbumParam>
}
export interface IAlbumParam {
    id:string
}
export interface IAlbumData {
    subscribedCount: number
    coverImgUrl: string
    name: string
    creator: IAlbumCreator
    tracks: Array<ISongData>
}

export interface IAlbumCreator {
    avatarUrl: string
    nickname: string
}

export interface IChangeEnterLoadingAction {
    type: typeof action.CHANGE_ALBUM_ENTER_LOADING
    data: boolean
}

export interface IGetAlbumDataSuccessAction {
    type: typeof action.CHANGE_CURRENT_ALBUM_SUCCESS
    data: IAlbumData
}
export type ActionTypes = IChangeEnterLoadingAction | IGetAlbumDataSuccessAction
