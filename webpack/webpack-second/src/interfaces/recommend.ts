/** @format */

import {List} from 'immutable'
import {RouteComponentProps} from 'react-router'
import * as action from '@/constants/index'
export interface IProps {
    bannerList: List<IBanner>
    recommendList: List<IRecommend>
    enterLoading: boolean
    getBannerDataDispatch: Function
    getRecommendDataDispatch: Function
}

export interface IRecommendProps extends RouteComponentProps {
    recommendList: Array<IRecommend>
}
export interface IRecommend {
    id: string
    picUrl: string
    playCount: number
    name: string
}
export interface IBannerProps {
    bannerList: Array<IBanner>
}
export interface IBanner {
    imageUrl: string
}

export interface IChangeBannerListSuccessAction {
    type: typeof action.CHANGE_BANNER_SUCCESS
    data: Array<IBanner>
}
export interface IChangeEnterLoadingAction {
    type: typeof action.CHANGE_ENTER_LOADING
    data: boolean
}
export interface IChangeRecommendListSuccessAction {
    type: typeof action.CHANGE_RECOMMEND_LIST_SUCESS
    data: Array<IRecommend>
}
export type ActionTypes = IChangeBannerListSuccessAction | IChangeEnterLoadingAction | IChangeRecommendListSuccessAction
