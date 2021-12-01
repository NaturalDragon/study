import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/loading/index'; 
import {pulldownChange,pullupChange, changeArtistList,refreshMoreSingerList,refreshInitSingerList, changeCategory,changeType, changeAlpha } from '../../actions/singer'
import {renderRoutes} from 'react-router-config'
import Horizen from '../../baseUI/horizen-item/index'
import { NavContainer, List, ListItem, ListContainer,EnterLoading } from './style'
import { categoryTypes, alphaTypes,areaTypes,musicTypes } from '../../api/config'
import Scroll from '../../baseUI/scroll/index'
function Singer(props) {
    const scrollRef=useRef();
    const {listOffset, enterLoading, pullDownLoading, pullUpLoading, artistList, category,type, alpha } = props;
    const { updateCategory, updateType,updateAlpha, getArtistListDataDispatch,pullDownRefresh,pullUpRefresh } = props;
    const artistListJS = artistList ? artistList.toJS() : []
    useEffect(() => {
        if (!artistList.size) {
            getArtistListDataDispatch()
        }
    }, [])
    const handleUpdateCategory = (newVal) => {
        if (category === newVal) return;
        updateCategory(newVal);
        getArtistListDataDispatch()
    

    };
    const handleUpdateType=(newVal)=>{
        if (type === newVal) return;
        updateType(newVal)
        getArtistListDataDispatch()
    }
    const handleUpdateAlpha = (newVal) => {
        if (alpha === newVal) return;
        updateAlpha(newVal);
        getArtistListDataDispatch()

    };

    const handlePullUp=()=>{
        pullUpRefresh()
        console.log('handlePullUp')
    }
    const handlePullDown=()=>{

        pullDownRefresh()
        console.log('handlePullDown')
    }
    const enterDetail=(id)=>{
        props.history.push('/singers/'+id)
    }
    const renderSingerList = () => {
        const { artistList } = props;

        return (
            <List>
                {
                    artistList.toJS().map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../assets/singer.png')} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };
    return (<div>
        <NavContainer>
            <Horizen title={'区域:'} value={category} list={areaTypes} handleClick={handleUpdateCategory}></Horizen>
            <Horizen title={'类型:'} value={type} list={musicTypes} handleClick={handleUpdateType}></Horizen>
            
            <Horizen title='首字母:' value={alpha} handleClick={handleUpdateAlpha} list={alphaTypes}></Horizen>
            <ListContainer>
                <Scroll
                    direction='vertical'
                    ref={scrollRef}
                    onScroll={forceCheck}
                    pullUp={ handlePullUp }
                    pullDown = { handlePullDown }
                    pullDownLoading={pullDownLoading}
                    pullUpLoading={pullUpLoading}
                >
                    {renderSingerList()}</Scroll>

            </ListContainer>
        </NavContainer>
        { enterLoading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        {
            renderRoutes(props.route.routes)
        }
    </div>)
}

const mapStateToProps = (state) => {
    debugger
    return {
        category: state.getIn(['singer', 'category']),
        type: state.getIn(['singer', 'type']),
        alpha: state.getIn(['singer', 'alpha']),
        artistList: state.getIn(['singer', 'artistList']),
        listOffset:state.getIn(['singer', 'listOffset']),
        enterLoading: state.getIn(['singer', 'enterLoading']),
        pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
        pullDownLoading: state.getIn(['singer', 'pullDownLoading'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCategory(newVal) {
            dispatch(changeCategory(newVal))
        },
        updateType(newVal){
            dispatch(changeType(newVal))
        },
        updateAlpha(newVal) {
            dispatch(changeAlpha(newVal))
        },
        getArtistListDataDispatch() {
            dispatch(changeArtistList())
        },
        pullDownRefresh(){
            dispatch(refreshInitSingerList())
        },
        pullUpRefresh() {
           
            dispatch(refreshMoreSingerList())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));