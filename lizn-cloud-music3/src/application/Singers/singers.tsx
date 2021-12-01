/** @format */

import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import LazyLoad, {forceCheck} from 'react-lazyload'
import Loading from '@/baseUI/loading/index'
import Horizen from '@/baseUI/horizen-item/index'
import {categoryTypes, alphaTypes, areaTypes, musicTypes} from '@/api/config'
import Scroll from '@/baseUI/scroll/index'
import {Map} from 'immutable'
import {Debouce} from '@/api/utils'
import {ISingerProps, IArtist} from '@/interfaces/singer'
import {IScrollFunc} from '@/interfaces/scroll'
import {
    singerState,
    changeArtistListAction,
    changeAlpha,
    changeCategory,
    changeType,
    refreshInitSingerList,
    refreshMoreSingerList,
    changeScrollY,
} from '@/slice/singerSlice'
import './singers.less'
const {useEffect, useRef, useMemo, useCallback} = React
function Singer(props: ISingerProps) {
    const scrollRef = useRef<IScrollFunc>()
    const dispatch = useDispatch()
    const {
        listOffset,
        scrollY,
        enterLoading,
        pullDownLoading,
        pullUpLoading,
        artistList,
        category,
        type,
        alpha,
    } = useSelector(singerState)
    const changeScrollYDipatch = useMemo(() => {
        return Debouce.init((y: number) => {
            dispatch(changeScrollY(y))
        }, 500)
    }, [changeScrollY])

    //   const {
    //     updateCategory,
    //     updateType,
    //     updateAlpha,
    //     getArtistListDataDispatch,
    //     pullDownRefresh,
    //     pullUpRefresh,
    //   } = props;
    const artistListJS = artistList
    useEffect(() => {
        if (!scrollRef.current) return

        if (scrollY !== 0) {
            setTimeout(() => {
                const bScroll = scrollRef.current.getBScroll()
                debugger
                bScroll.scrollTo(0, scrollY, 10)
            }, 10)
        }
    }, [])
    useEffect(() => {
        if (artistList.length <= 0) {
            dispatch(changeArtistListAction())
        }
    }, [])
    const handleUpdateCategory = (newVal: string) => {
        if (category === newVal) return
        dispatch(changeCategory(newVal))
        dispatch(changeArtistListAction())
    }
    const handleUpdateType = (newVal: string) => {
        if (type === newVal) return
        dispatch(changeType(newVal))
        dispatch(changeArtistListAction())
    }
    const handleUpdateAlpha = (newVal: string) => {
        if (alpha === newVal) return
        dispatch(changeAlpha(newVal))
        dispatch(changeArtistListAction())
    }

    const handlePullUp = () => {
        dispatch(refreshMoreSingerList())

        console.log('handlePullUp')
    }
    const handlePullDown = () => {
        dispatch(refreshInitSingerList())
        console.log('handlePullDown')
    }
    const enterDetail = (id: string) => {
        props.history.push('/singerInfo/' + id)
    }
    // const renderSingerList = () => {
    //   console.log(222);
    //   return (

    //   );
    // };
    return (
        <div>
            <div className="navContainer">
                <Horizen title="区域:" value={category} list={areaTypes} handleClick={handleUpdateCategory}></Horizen>
                <Horizen title="类型:" value={type} list={musicTypes} handleClick={handleUpdateType}></Horizen>

                <Horizen title="首字母:" value={alpha} handleClick={handleUpdateAlpha} list={alphaTypes}></Horizen>
                <div className="listContainer">
                    <Scroll
                        height={window.innerHeight - 94 - 3 * 30}
                        direction="vertical"
                        ref={scrollRef}
                        onScroll={e => {
                            changeScrollYDipatch(e.y)
                            forceCheck()
                        }}
                        pullUp={handlePullUp}
                        pullDown={handlePullDown}
                        pullDownLoading={pullDownLoading}
                        pullUpLoading={pullUpLoading}>
                        {/* {renderSingerList()} */}
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
                                                <img
                                                    src={`${item.picUrl}?param=300x300`}
                                                    width="100%"
                                                    height="100%"
                                                    alt="music"
                                                />
                                            </LazyLoad>
                                        </div>
                                        <span className="name">{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
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

export default Singer
