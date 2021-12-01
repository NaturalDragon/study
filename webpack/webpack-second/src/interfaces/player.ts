/** @format */
import {Record, List} from 'immutable'
import {ISongData} from './song'
import {playMode} from '@/api/config'
import {ILyric} from '@/api/lyric-parser'
import * as action from '@/constants'

export interface IPlayerProps {
    fullScreen: boolean
    playing: boolean
    currentIndex: number
    mode: playMode
    currentSong: Record<ISongData>
    playList: List<ISongData>
    sequencePlayList: List<ISongData>
    toggleFullScreenDispatch: Function
    togglePlayingDispatch: Function
    changeModeDispatch: Function
    changeCurrentIndexDispatch: Function
    changeCurrentDispatch: Function
    changePlayListDispatch: Function
}

export interface IMiniPlayerProps {
    fullScreen: boolean
    playing: boolean
    percent: number
    song: ISongData
    toggleFullScreen: Function
    clickPlaying: Function
}

export interface INormalPlayerProps {
    currentLyric: ILyric
    currentPlayingLyric: string
    currentLineNum: number
    song: ISongData
    fullScreen: boolean
    playing: boolean
    duration: number
    currentTime: number
    percent: number
    mode: playMode
    toggleFullScreen: Function
    clickPlaying: Function
    onProgressChange: Function
    handlePre: React.MouseEventHandler
    handleNext: React.MouseEventHandler
    changeMode: React.MouseEventHandler
}
export interface IProgressCircleProps {
    radius: number
    percent: number
    children: React.ReactNode
}

export interface IProgressBarProps {
    percent: number
    percentChange: Function
}

export interface ITouchData {
    initiated: boolean
    startX: number
    left: number
}

export interface IchangeCurrentSongAction {
    type: typeof action.SET_CURRENT_SONG
    data: ISongData
}

export interface IChangeFullScreenAction {
    type: typeof action.SET_FULL_SCREEN
    data: boolean
}

export interface IChangePlayingStateAction {
    type: typeof action.SET_PLAYING_STATE
    data: boolean
}

export interface IChangeSequecePlayListAction {
    type: typeof action.SET_SEQUECE_PLAYLIST
    data: ISongData[]
}

export interface IChangePlayListAction {
    type: typeof action.SET_PLAYLIST
    data: ISongData[]
}

export interface IChangePlayModeAction {
    type: typeof action.SET_PLAY_MODE
    data: playMode
}

export interface IChangeCurrentIndexAction {
    type: typeof action.SET_CURRENT_INDEX
    data: number
}
export interface IChangeShowPlayListAction {
    type: typeof action.SET_SHOW_PLAYLIST
    data: boolean
}

export type ActionTypes =
    | IchangeCurrentSongAction
    | IChangeFullScreenAction
    | IChangePlayingStateAction
    | IChangeSequecePlayListAction
    | IChangePlayListAction
    | IChangePlayModeAction
    | IChangeCurrentIndexAction
    | IChangeShowPlayListAction
