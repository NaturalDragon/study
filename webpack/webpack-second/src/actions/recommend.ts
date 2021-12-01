import {CHANGE_BANNER,CHANGE_BANNER_SUCCESS,CHANGE_RECOMMEND_LIST,
    CHANGE_RECOMMEND_LIST_SUCESS,CHANGE_ENTER_LOADING} from '@/constants/index'
import {IBanner,IRecommend} from '@/interfaces/recommend'
import {fromJS} from 'immutable'

export const changeBannerList=()=>{
    return {
        type:CHANGE_BANNER
    }
}
export const changeBannerListSuccess=(data:IBanner)=>{
    return {
        type:CHANGE_BANNER_SUCCESS,
        data:fromJS(data)
    }
}
export const changeEnterLoading=(data:boolean)=>{
    return {
        type:CHANGE_ENTER_LOADING,
        data
    }
}
export const changeRecommendList=()=>{
    return {
        type:CHANGE_RECOMMEND_LIST
    }
}
export const changeRecommendListSuccess=(data:IRecommend)=>{
    return{
        type:CHANGE_RECOMMEND_LIST_SUCESS,
        data:fromJS(data)
    }
}