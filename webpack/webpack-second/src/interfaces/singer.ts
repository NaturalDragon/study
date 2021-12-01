/** @format */

import {List} from 'immutable'
import {RouteComponentProps} from 'react-router'
import * as action from '@/constants/index'
export interface ISingerProps extends RouteComponentProps {
    listOffset: number
    enterLoading: boolean
    pullDownLoading: boolean
    pullUpLoading: boolean
    artistList: List<IArtist>
    category: string
    type: string
    alpha: string
    updateCategory: Function
    updateType: Function
    updateAlpha: Function
    getArtistListDataDispatch: Function
    pullDownRefresh: Function
    pullUpRefresh: Function
}

export interface IArtist{
    id:string,
    name:string,
    accountId:string,
    picUrl:string
}
export interface IChangeCategoryAction{
    type:typeof action.CHANGE_CATOGORY,
    data:string
}
export interface IChangeAlphaAction{
    type:typeof action.CHANGE_ALPHA,
    data:string
}
export interface IChangeTypeAction{
    type:typeof action.CHANGE_TYPE,
    data:string
}
export interface ISetOffsetCountAction{
    type:typeof action.CHANGE_LIST_OFFSET,
    data:number
}

export interface IEnterloadingChangeAction{
    type:typeof action.CHANGE_SINGER_ENTER_LOADING,
    data:boolean
}
export interface IPullupChangeAction{
    type:typeof action.CHANGE_PULLUP_LOADING,
    data:boolean
}
export interface IPulldownChangeAction{
    type:typeof action.CHANGE_PULLDOWN_LOADING,
    data:boolean
}

export interface IChangeArtistListSuccessAction{
    type:typeof action.CHANGE_SONGS_OF_ARTIST_SUCCESS,
    data:Array<IArtist>
}

export type ActionTypes=
IChangeArtistListSuccessAction|
IChangeCategoryAction|
IChangeAlphaAction|
IChangeTypeAction|
ISetOffsetCountAction|
IEnterloadingChangeAction|
IPullupChangeAction|
IPulldownChangeAction