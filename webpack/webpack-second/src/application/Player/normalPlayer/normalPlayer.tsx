/** @format */

import * as React from 'react'
import {getName, formatPlayTime} from '@/api/utils'
import {playMode} from '@/api/config'
import {CSSTransition} from 'react-transition-group'
//import {registerAnimation, runAnimation, unregisterAnimation} from 'create-keyframe-animation'
import {prefixStyle} from '@/api/prefixStyle'
import ProgressBar from '@/baseUI/progress-bar'
import {INormalPlayerProps} from '@/interfaces/player'
import {IScrollFunc} from '@/interfaces/scroll'
import Scroll from '@/baseUI/scroll'
import './normalPlayer.less'

const {registerAnimation, runAnimation, unregisterAnimation} = require('create-keyframe-animation')
const {useRef, useEffect} = React
const transform = prefixStyle('transform')
const transition = prefixStyle('transition')
function NormalPlayer(props: INormalPlayerProps) {
    const {
        song,
        fullScreen,
        playing,
        duration,
        currentTime,
        percent,
        mode,
        currentLineNum,
        currentPlayingLyric,
        currentLyric,
    } = props
    const {toggleFullScreen, clickPlaying, onProgressChange, handlePre, handleNext, changeMode} = props
    const normalPlayerRef = useRef<HTMLDivElement>()
    const cdWrapperRef = useRef<HTMLDivElement>()
    const [currentState, setCurrentState] = React.useState('')
    const lyricScrollRef = useRef<IScrollFunc>()
    const lyricLineRefs = useRef([])
    const getPlayMode = () => {
        let content
        if (mode === playMode.sequence) {
            content = '&#xe625;'
        } else if (mode === playMode.loop) {
            content = '&#xe653;'
        } else {
            content = '&#xe61b;'
        }
        return content
    }

    useEffect(() => {
        if (!lyricScrollRef.current) return
        const bScroll = lyricScrollRef.current.getBScroll()

        if (currentLineNum > 5) {
            const currentLine = lyricLineRefs.current[currentLineNum - 5].current
            bScroll.scrollToElement(currentLine, 1000)
        } else {
            bScroll.scrollTo(0, 0, 1000)
        }
    }, [currentLineNum])
    // 启用帧动画
    const enter = () => {
        normalPlayerRef.current.style.display = 'block'
        const {x, y, scale} = _getPosAndScale()
        let animation = {
            0: {
                transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
            },
            60: {
                transform: `translate3d(0,0,0) scale(1.1)`,
            },
            100: {
                transform: `translate3d(0,0,0) scale(1)`,
            },
        }
        registerAnimation({
            name: 'move',
            animation,
            presets: {
                duration: 400,
                easing: 'linear',
            },
        })
        runAnimation(cdWrapperRef.current, 'move')
    }
    const afterEnter = () => {
        // 进入后解绑帧动画
        unregisterAnimation('move')
        cdWrapperRef.current.style.animation = ''
        setCurrentState('')
    }
    const leave = () => {
        if (!cdWrapperRef.current) return
        const cdWrapperDom = cdWrapperRef.current
        const {x, y, scale} = _getPosAndScale()
        cdWrapperDom.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        cdWrapperDom.style[transition] = `all 0.4s`
    }

    const afterLeave = () => {
        if (!cdWrapperRef.current) return
        const cdWrapperDom = cdWrapperRef.current
        cdWrapperDom.style[transform] = ''
        cdWrapperDom.style[transition] = ''
        normalPlayerRef.current.style.display = 'none'
    }

    // 计算偏移的辅助函数
    const _getPosAndScale = () => {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        // 两个圆心的横坐标距离和纵坐标距离
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
            x,
            y,
            scale,
        }
    }
    const toggleCurrentState = () => {
        if (currentState !== 'lyric') {
            setCurrentState('lyric')
        } else {
            setCurrentState('')
        }
    }

    return (
        <CSSTransition
            in={fullScreen}
            timeout={400}
            classNames="normal"
            mountOnEnter={true}
            onEnter={enter}
            onEntered={afterEnter}
            onExit={leave}
            onExited={afterLeave}>
            <div className="normalPlayerContainer" ref={normalPlayerRef}>
                <div className="background">
                    <img src={song.al.picUrl + '?param=300x300'} width="100%" height="100%" alt="歌曲图片" />
                </div>
                <div className="background layer"></div>
                <div className="top">
                    <div className="back" onClick={() => toggleFullScreen(false)}>
                        <i className="iconfont icon-back">&#xe662;</i>
                    </div>
                    <h1 className="title">{song.name}</h1>
                    <h1 className="subtitle">{getName(song.ar)}</h1>
                </div>
                <div className="middle" ref={cdWrapperRef} onClick={toggleCurrentState}>
                    {/* <div className="cDWrapper">
                        <div className="cd">
                            <img
                                className={`image play ${playing ? '' : 'pause'}`}
                                src={song.al.picUrl + '?param=400x400'}
                                alt=""
                            />
                        </div>
                    </div> */}
                    <CSSTransition timeout={400} classNames="fade" in={currentState !== 'lyric'}>
                        <div
                            className="cDWrapper"
                            style={{visibility: currentState !== 'lyric' ? 'visible' : 'hidden'}}>
                            <div className="cd">
                                <img
                                    className={`image play ${playing ? '' : 'pause'}`}
                                    src={song.al.picUrl + '?param=400x400'}
                                    alt=""
                                />
                            </div>
                            <p className="playing_lyric">{currentPlayingLyric}</p>
                        </div>
                    </CSSTransition>
                    <CSSTransition timeout={400} classNames="fade" in={currentState === 'lyric'}>
                        <div className="lyricContainer">
                            <Scroll ref={lyricScrollRef}>
                                <div
                                    className="lyricWrapper"
                                    style={{visibility: currentState === 'lyric' ? 'visible' : 'hidden'}}>
                                    {currentLyric &&
                                        currentLyric.lines.map((line, index) => {
                                            lyricLineRefs.current[index] = React.createRef()
                                            return (
                                                <p
                                                    ref={lyricLineRefs.current[index]}
                                                    className={`playing_lyric ${
                                                        currentLineNum === index ? 'current' : ''
                                                    }`}
                                                    key={index}>
                                                    {line.txt}
                                                </p>
                                            )
                                        })}
                                </div>
                            </Scroll>
                        </div>
                    </CSSTransition>
                </div>
                <div className="bottom">
                    <div className="progressWrapper">
                        <span className="time time-l">{formatPlayTime(currentTime)}</span>
                        <div className="progress-bar-wrapper">
                            <ProgressBar percent={percent} percentChange={onProgressChange}></ProgressBar>
                        </div>
                        <div className="time time-r">{formatPlayTime(duration)}</div>
                    </div>
                    <div className="operators">
                        <div className="icon i-left" onClick={changeMode}>
                            <i className="iconfont" dangerouslySetInnerHTML={{__html: getPlayMode()}}></i>
                        </div>
                        <div className="icon i-left" onClick={handlePre}>
                            <i className="iconfont">&#xe6e1;</i>
                        </div>
                        <div className="icon i-center" onClick={e => clickPlaying(e, !playing)}>
                            <i
                                className="iconfont"
                                dangerouslySetInnerHTML={{__html: playing ? '&#xe723' : '&#xe731'}}></i>
                        </div>
                        <div className="icon i-right" onClick={handleNext}>
                            <i className="iconfont">&#xe718;</i>
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont">&#xe640;</i>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default React.memo(NormalPlayer)
