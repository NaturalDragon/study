/** @format */

import * as React from 'react'
import {connect} from 'react-redux'
import LazyLoad, {forceCheck} from 'react-lazyload'
import Loading from '@/baseUI/loading/index'
import {
    pulldownChange,
    pullupChange,
    changeArtistList,
    refreshMoreSingerList,
    refreshInitSingerList,
    changeCategory,
    changeType,
    changeAlpha,
} from '@/actions/singer'
import {renderRoutes} from 'react-router-config'
import Horizen from '@/baseUI/horizen-item/index'
import {categoryTypes, alphaTypes, areaTypes, musicTypes} from '@/api/config'
import Scroll from '@/baseUI/scroll/index'
import {Map} from 'immutable'
import {ISingerProps, IArtist} from '@/interfaces/singer'
import './singers.less'
const {useEffect, useRef} = React
function Singer(props: ISingerProps) {
    const scrollRef = useRef()
    const {listOffset, enterLoading, pullDownLoading, pullUpLoading, artistList, category, type, alpha} = props
    const {updateCategory, updateType, updateAlpha, getArtistListDataDispatch, pullDownRefresh, pullUpRefresh} = props
    const artistListJS = artistList ? artistList.toJS() : new Array<IArtist>()
    useEffect(() => {
        if (!artistList.size) {
            getArtistListDataDispatch()
        }
    }, [])
    const handleUpdateCategory = (newVal: string) => {
        if (category === newVal) return
        updateCategory(newVal)
        getArtistListDataDispatch()
    }
    const handleUpdateType = (newVal: string) => {
        if (type === newVal) return
        updateType(newVal)
        getArtistListDataDispatch()
    }
    const handleUpdateAlpha = (newVal: string) => {
        if (alpha === newVal) return
        updateAlpha(newVal)
        getArtistListDataDispatch()
    }

    const handlePullUp = () => {
        pullUpRefresh()
        console.log('handlePullUp')
    }
    const handlePullDown = () => {
        pullDownRefresh()
        console.log('handlePullDown')
    }
    const enterDetail = (id: string) => {
        props.history.push('/singerInfo/' + id)
    }
    const renderSingerList = () => {
        const {artistList} = props

        return (
            <div className="singers_list">
                {artistListJS.map((item, index) => {
                    return (
                        <div
                            className="singer_listItem"
                            key={item.accountId + '' + index}
                            onClick={() => enterDetail(item.id)}>
                            <div className="img_wrapper">
                                <LazyLoad
                                    placeholder={
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={require('../../assets/singer.png')}
                                            alt="music"
                                        />
                                    }>
                                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                </LazyLoad>
                            </div>
                            <span className="name">{item.name}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div>
            <div className="navContainer">
                <Horizen title="区域:" value={category} list={areaTypes} handleClick={handleUpdateCategory}></Horizen>
                <Horizen title="类型:" value={type} list={musicTypes} handleClick={handleUpdateType}></Horizen>

                <Horizen title="首字母:" value={alpha} handleClick={handleUpdateAlpha} list={alphaTypes}></Horizen>
                <div className="listContainer">
                    <Scroll
                        height={500}
                        direction="vertical"
                        ref={scrollRef}
                        onScroll={forceCheck}
                        pullUp={handlePullUp}
                        pullDown={handlePullDown}
                        pullDownLoading={pullDownLoading}
                        pullUpLoading={pullUpLoading}>
                        {renderSingerList()}
                    </Scroll>
                </div>
            </div>
            {enterLoading ? (
                <div className="enterLoading">
                    <Loading></Loading>
                </div>
            ) : null}
            {/* {
            renderRoutes(props.route.routes)
        } */}
        </div>
    )
}

const mapStateToProps = (state: Map<object, object>) => {
    return {
        category: state.getIn(['singer', 'category']),
        type: state.getIn(['singer', 'type']),
        alpha: state.getIn(['singer', 'alpha']),
        artistList: state.getIn(['singer', 'artistList']),
        listOffset: state.getIn(['singer', 'listOffset']),
        enterLoading: state.getIn(['singer', 'enterLoading']),
        pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
        pullDownLoading: state.getIn(['singer', 'pullDownLoading']),
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        updateCategory(newVal: string) {
            dispatch(changeCategory(newVal))
        },
        updateType(newVal: string) {
            dispatch(changeType(newVal))
        },
        updateAlpha(newVal: string) {
            dispatch(changeAlpha(newVal))
        },
        getArtistListDataDispatch() {
            dispatch(changeArtistList())
        },
        pullDownRefresh() {
            dispatch(refreshInitSingerList())
        },
        pullUpRefresh() {
            dispatch(refreshMoreSingerList())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Singer)
