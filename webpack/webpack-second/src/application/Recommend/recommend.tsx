/** @format */

import * as React from 'react'
import {Map} from 'immutable'
import {renderRoutes} from 'react-router-config'
import {connect} from 'react-redux'
import {changeBannerList, changeRecommendList} from '@/actions/recommend'
import Slider from '@/components/slider/index'
import RecommendList from '@/components/list'
import Loading from '@/baseUI/loading-v2/index'
import Scroll from '@/baseUI/scroll/index'
import {forceCheck} from 'react-lazyload'
import {IScrollFunc} from '@/interfaces/scroll'
import {IProps} from '@/interfaces/recommend'
import './recommend.less'

function Recommend(props: IProps) {
    const {bannerList, recommendList, enterLoading} = props
    const {getBannerDataDispatch, getRecommendDataDispatch} = props
    const bannerListJS = bannerList ? bannerList.toJS() : []
    const recommendListJS = recommendList ? recommendList.toJS() : []
    //  const scrollRef = React.useRef<IScrollFunc>()
    React.useEffect(() => {
        if (!bannerList.size) {
            getBannerDataDispatch()
        }
        if (!recommendList.size) {
            getRecommendDataDispatch()
        }
    }, [])

    return (
        <div className="content">
            <Scroll onScroll={forceCheck}>
                <div>
                    <div className="before"></div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            {enterLoading && <Loading></Loading>}
            {/* {
            renderRoutes(props.route.routes)
        } */}
        </div>
    )
}
const mapStateToProps = (state: Map<string, object>) => {
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
        enterLoading: state.getIn(['recommend', 'enterLoading']),
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getBannerDataDispatch() {
            dispatch(changeBannerList())
        },
        getRecommendDataDispatch() {
            dispatch(changeRecommendList())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
