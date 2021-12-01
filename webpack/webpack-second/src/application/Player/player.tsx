/** @format */

import * as React from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import Toast from '@/baseUI/toast'
import {getLyricRequest} from '@/services/player'
import {getSongUrl, isEmptyObject, shuffle, findIndex} from '@/api/utils'
import {
    changeCurrentIndex,
    changeFullScreen,
    changePlayMode,
    changeCurrentSong,
    changePlayList,
    changePlayingState,
    changeSequecePlayList,
    changeShowPlayList,
} from '@/actions/player'
import {playMode} from '@/api/config'
import {IPlayerProps} from '@/interfaces/player'
import {ISongData} from '@/interfaces/song'
import {IToastProps, IToastRef} from '@/interfaces/toast'
import Lyric, {ILyric, IHandler, ILyricLine} from '@/api/lyric-parser'
const {useEffect, useRef, useState} = React
function Player(props: IPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>()
    const {
        fullScreen,
        playing,
        currentIndex,
        mode,
        currentSong: immutableCurrentSong,
        playList: immutablePlayList,
        sequencePlayList: immutableSequencePlayList,
    } = props

    const {
        toggleFullScreenDispatch,
        togglePlayingDispatch,
        changeModeDispatch,
        changeCurrentIndexDispatch,
        changeCurrentDispatch,
        changePlayListDispatch,
    } = props
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [preSong, setPreSong] = useState<ISongData>({id: ''})
    const [modeText, setModeText] = useState<string>('')
    const toastRef = useRef<IToastRef>()
    const currentLyric = useRef<ILyric>()
    const [currentPlayingLyric, setPlayingLyric] = useState<string>('')
    const currentLineNum = useRef(0)
    let percent: number = isNaN(currentTime / duration) ? 0 : currentTime / duration
    const playList = immutablePlayList.toJS()
    const currentSong = immutableCurrentSong.toJS()
    const sequencePlayList = immutableSequencePlayList.toJS()
    // useEffect(() => {
    //   changeCurrentIndexDispatch(0);
    // }, [])
    useEffect(() => {
        if (currentIndex === -1 || !playList[currentIndex] || playList[currentIndex].id === preSong.id) return
        changeCurrentIndexDispatch(currentIndex)
        let current = playList[currentIndex]
        changeCurrentDispatch(current)
        setPreSong(current)
        audioRef.current.src = getSongUrl(current.id)
        audioRef.current.autoplay = true
        audioRef.current.playbackRate = 1
        togglePlayingDispatch(true) //播放状态
        getLyric(current.id)
        setCurrentTime(0)
        setDuration((current.dt / 1000) | 0)
    }, [currentIndex])
    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
    }, [playing])

    const handleLyric = ({time, txt}: ILyricLine) => {
        if (!currentLyric.current) return
        currentLineNum.current = time
        setPlayingLyric(txt)
        console.log(time)
        console.log(txt)
        console.log(currentLyric.current.lines)
    }
    const getLyric = (id: string) => {
        let lyric: string = ''
        if (currentLyric.current) {
            currentLyric.current.stop()
        }
        getLyricRequest(id).then(result => {
            debugger
            const {data} = result
            lyric = data.lrc.lyric
            if (!lyric) {
                currentLyric.current = null
                return
            }
            currentLyric.current = new Lyric(lyric, handleLyric, 1)
            //currentLyric.current._init()
            currentLyric.current.play()
            currentLineNum.current = 0
            currentLyric.current.seek(0)
        })
    }
    const clickPlaying = (e: MouseEvent, state: boolean) => {
        e.stopPropagation()
        togglePlayingDispatch(state)
        if (currentLyric.current) {
            currentLyric.current.togglePlay(currentTime * 1000)
        }
    }
    const updateTime = (e: any) => {
        // console.log(e.target.currentTime)
        setCurrentTime(e.target.currentTime)
    }
    const onProgressChange = (currentPercent: number) => {
        console.log(`currentPercent:${currentPercent}`)
        const newTime = currentPercent * duration
        setCurrentTime(newTime)
        audioRef.current.currentTime = newTime
        if (!playing) {
            togglePlayingDispatch(true)
        }
        if (currentLyric) {
            currentLyric.current.seek(newTime * 1000)
        }
    }

    const handleLoop = () => {
        audioRef.current.currentTime = 0
        togglePlayingDispatch(true)
        //  audioRef.current.play()
    }
    //上一首
    const handlePre = () => {
        if (playList.length === 1) {
            handleLoop()
            return
        }
        let index = currentIndex - 1
        if (index < 0) index = playList.length - 1
        if (!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }
    //下一首
    const handleNext = () => {
        if (playList.length === 1) {
            handleLoop()
            return
        }
        let index = currentIndex + 1
        if (index === playList.length) index = 0
        if (!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }
    const handleEnd = () => {
        if (mode === playMode.loop) {
            handleLoop()
        } else {
            handleNext()
        }
    }
    const changeMode = () => {
        let newMode = (Number(mode) + 1) % 3
        if (newMode === 0) {
            //顺序模式
            changePlayListDispatch(sequencePlayList)
            let index = findIndex(currentSong, sequencePlayList)
            changeCurrentIndexDispatch(index)
            setModeText('顺序循环')
        } else if (newMode === 1) {
            //单曲循环
            changePlayListDispatch(sequencePlayList)
            setModeText('单曲循环')
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList)
            let index = findIndex(currentSong, newList)
            changePlayListDispatch(newList)
            changeCurrentIndexDispatch(index)
            setModeText('随机播放')
        }
        changeModeDispatch(newMode)
        toastRef.current.show()
    }
    return (
        <div>
            <audio onTimeUpdate={updateTime} ref={audioRef} onEnded={handleEnd}></audio>
            {!isEmptyObject(currentSong) ? (
                <MiniPlayer
                    fullScreen={fullScreen}
                    toggleFullScreen={toggleFullScreenDispatch}
                    playing={playing}
                    clickPlaying={clickPlaying}
                    percent={percent}
                    song={currentSong}></MiniPlayer>
            ) : null}
            {!isEmptyObject(currentSong) ? (
                <NormalPlayer
                    currentLineNum={currentLineNum.current}
                    currentLyric={currentLyric.current}
                    currentPlayingLyric={currentPlayingLyric}
                    fullScreen={fullScreen}
                    toggleFullScreen={toggleFullScreenDispatch}
                    playing={playing}
                    clickPlaying={clickPlaying}
                    song={currentSong}
                    duration={duration}
                    currentTime={currentTime}
                    percent={percent}
                    onProgressChange={onProgressChange}
                    handlePre={handlePre}
                    handleNext={handleNext}
                    mode={mode}
                    changeMode={changeMode}></NormalPlayer>
            ) : null}
            <Toast text={modeText} ref={toastRef}></Toast>
        </div>
    )
}

const mapStateToProps = (state: Map<string, object>) => {
    return {
        fullScreen: state.getIn(['player', 'fullScreen']),
        playing: state.getIn(['player', 'playing']),
        currentSong: state.getIn(['player', 'currentSong']),
        showPlayList: state.getIn(['player', 'showPlayList']),
        mode: state.getIn(['player', 'mode']),
        currentIndex: state.getIn(['player', 'currentIndex']),
        playList: state.getIn(['player', 'playList']),
        sequencePlayList: state.getIn(['player', 'sequencePlayList']),
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        togglePlayingDispatch(data: boolean) {
            dispatch(changePlayingState(data))
        },
        toggleFullScreenDispatch(data: boolean) {
            dispatch(changeFullScreen(data))
        },
        togglePlayListDispatch(data: Array<ISongData>) {
            dispatch(changeShowPlayList(data))
        },
        changeCurrentIndexDispatch(index: number) {
            dispatch(changeCurrentIndex(index))
        },
        changeCurrentDispatch(data: ISongData) {
            dispatch(changeCurrentSong(data))
        },
        changeModeDispatch(data: playMode) {
            dispatch(changePlayMode(data))
        },
        changePlayListDispatch(data: Array<ISongData>) {
            dispatch(changePlayList(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
