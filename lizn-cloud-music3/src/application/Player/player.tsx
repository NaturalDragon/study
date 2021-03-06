/** @format */

import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Map} from 'immutable'
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import Toast from '@/baseUI/toast'
import {getLyricRequest} from '@/services/player'
import {getSongUrl, isEmptyObject, shuffle, findIndex} from '@/api/utils'
import {
    playerState,
    changeCurrentIndex,
    changeFullScreen,
    changePlayMode,
    changeCurrentSong,
    changePlayList,
    changePlayingState,
    changeSequecePlayList,
    changeShowPlayList,
} from '@/slice/playerSlice'
import {playMode} from '@/api/config'
import {IPlayerProps} from '@/interfaces/player'
import {ISongData} from '@/interfaces/song'
import {IToastProps, IToastRef} from '@/interfaces/toast'
import Lyric, {ILyric, IHandler, ILyricLine} from '@/api/lyric-parser'
const {useEffect, useRef, useState} = React
function Player() {
    const dispatch = useDispatch()
    const audioRef = useRef<HTMLAudioElement>()
    const {fullScreen, playing, currentIndex, mode, currentSong, playList, sequencePlayList} = useSelector(playerState)
    const togglePlayingDispatch = (data: boolean) => {
        dispatch(changePlayingState(data))
    }
    const toggleFullScreenDispatch = (data: boolean) => {
        dispatch(changeFullScreen(data))
    }
    const togglePlayListDispatch = (data: boolean) => {
        dispatch(changeShowPlayList(data))
    }
    const changeCurrentIndexDispatch = (index: number) => {
        dispatch(changeCurrentIndex(index))
    }
    const changeCurrentDispatch = (data: ISongData) => {
        dispatch(changeCurrentSong(data))
    }
    const changeModeDispatch = (data: playMode) => {
        dispatch(changePlayMode(data))
    }
    const changePlayListDispatch = (data: Array<ISongData>) => {
        dispatch(changePlayList(data))
    }
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [preSong, setPreSong] = useState<ISongData>({id: ''})
    const [modeText, setModeText] = useState<string>('')
    const toastRef = useRef<IToastRef>()
    const currentLyric = useRef<ILyric>()
    const [currentPlayingLyric, setPlayingLyric] = useState<string>('')
    const currentLineNum = useRef(0)
    let percent: number = isNaN(currentTime / duration) ? 0 : currentTime / duration
    //   const playList = immutablePlayList();
    //   const currentSong = immutableCurrentSong.toJS();
    //   const sequencePlayList = immutableSequencePlayList.toJS();
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
        togglePlayingDispatch(true) //????????????
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
    //?????????
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
    //?????????
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
            //????????????
            changePlayListDispatch(sequencePlayList)
            let index = findIndex(currentSong, sequencePlayList)
            changeCurrentIndexDispatch(index)
            setModeText('????????????')
        } else if (newMode === 1) {
            //????????????
            changePlayListDispatch(sequencePlayList)
            setModeText('????????????')
        } else if (newMode === 2) {
            //????????????
            let newList = shuffle(sequencePlayList)
            let index = findIndex(currentSong, newList)
            changePlayListDispatch(newList)
            changeCurrentIndexDispatch(index)
            setModeText('????????????')
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
export default Player
