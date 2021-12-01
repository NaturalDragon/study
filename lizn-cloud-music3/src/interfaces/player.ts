/** @format */
import { Record, List } from "immutable";
import { ISongData } from "./song";
import { playMode } from "@/api/config";
import { ILyric } from "@/api/lyric-parser";

export interface PlayerState {
  fullScreen: boolean; //播放器是否为全屏模式
  playing: boolean; //当前歌曲是否播放
  sequencePlayList: Array<ISongData>; //顺序列表
  playList: Array<ISongData>;
  mode: playMode; //播放模式
  currentIndex: number; //当前歌曲在播放列表的索引位置
  showPlayList: boolean; //是否展示播放列表
  currentSong: ISongData;
}
export interface IPlayerProps {
  fullScreen: boolean;
  playing: boolean;
  currentIndex: number;
  mode: playMode;
  currentSong: Record<ISongData>;
  playList: List<ISongData>;
  sequencePlayList: List<ISongData>;
  toggleFullScreenDispatch: Function;
  togglePlayingDispatch: Function;
  changeModeDispatch: Function;
  changeCurrentIndexDispatch: Function;
  changeCurrentDispatch: Function;
  changePlayListDispatch: Function;
}

export interface IMiniPlayerProps {
  fullScreen: boolean;
  playing: boolean;
  percent: number;
  song: ISongData;
  toggleFullScreen: Function;
  clickPlaying: Function;
}

export interface INormalPlayerProps {
  currentLyric: ILyric;
  currentPlayingLyric: string;
  currentLineNum: number;
  song: ISongData;
  fullScreen: boolean;
  playing: boolean;
  duration: number;
  currentTime: number;
  percent: number;
  mode: playMode;
  toggleFullScreen: Function;
  clickPlaying: Function;
  onProgressChange: Function;
  handlePre: React.MouseEventHandler;
  handleNext: React.MouseEventHandler;
  changeMode: React.MouseEventHandler;
}
export interface IProgressCircleProps {
  radius: number;
  percent: number;
  children: React.ReactNode;
}

export interface IProgressBarProps {
  percent: number;
  percentChange: Function;
}

export interface ITouchData {
  initiated: boolean;
  startX: number;
  left: number;
}
