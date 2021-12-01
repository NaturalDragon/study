/** @format */

import * as React from 'react'
import {connect} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import {Map} from 'immutable'
import Header from '@/baseUI/header/index'
import SongList from '../SongList/index'
import Scroll from '@/baseUI/scroll'
import {getArtistInfo} from '@/actions/singerInfo'
import {HEADER_HEIGHT} from '@/api/config'
import Loading from '@/baseUI/loading/index'
import {isEmptyObject} from '@/api/utils'
import {ISingerInfoProps} from '@/interfaces/singerInfo'
import {IMusicNoteRef} from '@/interfaces/musiceNote'
import MusicNote from '@/baseUI/music-note/index'
import './singerInfo.less'
import {fromJS} from 'immutable'

const {useEffect, useRef, useState} = React
function Singer(props: ISingerInfoProps) {
    const {enterLoading, artistInfo} = props
    console.log(enterLoading)
    const {getArtistInfoDispatch} = props
    let id = props.match.params.id
    useEffect(() => {
        getArtistInfoDispatch(id)
    }, [id])

    const artistInfoJS = artistInfo.toJS()
    const [showStatus, setShowStatus] = useState(true)
    const imageWrapper = useRef<HTMLDivElement>()
    const songScrollWrapper = useRef<HTMLDivElement>()
    const songScroll = useRef<HTMLDivElement>()
    const collectButton = useRef<HTMLDivElement>()
    // 图片初始高度
    const initialHeight = useRef(0)
    const layer = useRef<HTMLDivElement>()
    const header = useRef<HTMLDivElement>()
    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5
    const handleBack = () => {
        setShowStatus(false)
    }
    useEffect(() => {
        let h = imageWrapper.current.offsetHeight
        initialHeight.current = h
        songScrollWrapper.current.style.top = `${h - OFFSET}px`
        layer.current.style.top = `${h - OFFSET}px`
    }, [])

    const handelScroll = (pos: MouseEvent) => {
        let height = initialHeight.current
        const newY = pos.y
        const imageDOM = imageWrapper.current
        const buttonDOM = collectButton.current
        const headerDOM = header.current
        const layerDOM = layer.current
        const minScrollY = -(height - OFFSET) + HEADER_HEIGHT
        const percent = Math.abs(newY / height)
        console.log(minScrollY)
        if (newY > 0) {
            imageDOM.style['transform'] = `scale(${1 + percent})`
            buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`
            // buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            layerDOM.style.top = `${height - OFFSET + newY}px`
        } else if (newY >= minScrollY) {
            //往上滑动，但是还没超过Header部分
            layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`
            layerDOM.style.zIndex = '1'
            imageDOM.style.paddingTop = '75%'
            imageDOM.style.height = '0'
            imageDOM.style.zIndex = '-1'
            buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`
            buttonDOM.style['opacity'] = `${1 - percent * 2}`
        } else if (newY < minScrollY) {
            //往上滑动，但是超过Header部分
            layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`
            layerDOM.style.zIndex = '1'
            //防止溢出的歌单内容遮住Header
            headerDOM.style.zIndex = '100'
            //此时图片高度与Header一致
            imageDOM.style.height = `${HEADER_HEIGHT}px`
            imageDOM.style.paddingTop = '0'
            imageDOM.style.zIndex = '99'
        }
    }
    const musicNoteRef = useRef<IMusicNoteRef>()

    const musicAnimation = (x: number, y: number) => {
        musicNoteRef.current.startAnimation({x, y})
    }
    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack()}>
            <div className="singer-container">
                <Header ref={header} title={artistInfoJS.artist.name} handleClick={handleBack}></Header>
                <div
                    ref={imageWrapper}
                    style={{backgroundImage: `url(${artistInfoJS.artist.picUrl})`}}
                    className="sin-imgWrapper">
                    <div className="filter"></div>
                </div>
                <div ref={collectButton} className="collectButton">
                    <i className="iconfont">&#xe62d;</i>
                    <span className="singer-text"> 收藏 </span>
                </div>
                <div ref={layer} className="bgLayer"></div>
                <div ref={songScrollWrapper} className="songListWrapper">
                    <Scroll onScroll={handelScroll} ref={songScroll}>
                        <SongList
                            musicAnimation={musicAnimation}
                            songs={artistInfoJS.hotSongs}
                            showCollect={false}
                            collectCount={0}></SongList>
                    </Scroll>
                </div>
                <MusicNote ref={musicNoteRef}></MusicNote>
                {enterLoading && (
                    <div className="enterLoading">
                        <Loading></Loading>
                    </div>
                )}
            </div>
        </CSSTransition>
    )
}
const mapStateToProps = (state: Map<string, object>) => {
    return {
        artistInfo: state.getIn(['singerInfo', 'artistInfo']),
        enterLoading: state.getIn(['singerInfo', 'enterLoading']),
    }
}

const mapDispathToProps = (dispatch: Function) => {
    return {
        getArtistInfoDispatch(id: string) {
            debugger
            dispatch(getArtistInfo(id))
        },
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Singer)
