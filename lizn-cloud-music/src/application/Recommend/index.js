import React,{useEffect} from 'react';
import { connect } from 'react-redux'
import {changeBannerList,changeRecommendList} from '../../actions/recommend'
import Slider from '../../components/slider/index'
import RecommendList from '../../components/list/';
import Loading from '../../baseUI/loading-v2/index'
function Recommend(props) {
    const {bannerList,recommendList,enterLoading}=props    
    const {getBannerDataDispatch,getRecommendDataDispatch}=props
    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS=recommendList?recommendList.toJS():[]
    console.log(recommendListJS)
    useEffect(()=>{
        
        if(!bannerList.size){
            getBannerDataDispatch()
        }
        if(!recommendList.size){
            getRecommendDataDispatch()
        }

    },[])
    return (<div>
        <Slider bannerList={bannerListJS}></Slider>
        <RecommendList recommendList={recommendListJS}></RecommendList>
        {
            enterLoading&&<Loading></Loading>
        }
    </div>)
}
const mapStateToProps = (state) => {
    
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList:state.getIn(['recommend','recommendList']),
        enterLoading:state.getIn(['recommend','enterLoading'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getBannerDataDispatch(){
            dispatch(changeBannerList())
        },
        getRecommendDataDispatch(){
            dispatch(changeRecommendList())
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Recommend));