/** @format */

import {List} from 'immutable'
import {RouteComponentProps} from 'react-router'
export interface SingerState {
    category: string
    alpha: string
    type: string
    artistList: Array<IArtist>
    enterLoading: boolean
    pullUpLoading: boolean
    pullDownLoading: boolean
    listOffset: number
    scrollY: number
}
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

export interface IArtist {
    id: string
    name: string
    accountId: string
    picUrl: string
}
