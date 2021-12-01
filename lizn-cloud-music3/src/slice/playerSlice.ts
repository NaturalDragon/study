import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { PlayerState } from "@/interfaces/player";
import { ISongData } from "@/interfaces/song";
import { RootState } from "@/store/index";
import { playMode } from "@/api/config";
const playList = [] as Array<ISongData>;
const initialState: PlayerState = {
  fullScreen: false, //播放器是否为全屏模式
  playing: false, //当前歌曲是否播放
  sequencePlayList: playList, //顺序列表
  playList: playList,
  mode: playMode.sequence, //播放模式
  currentIndex: -1, //当前歌曲在播放列表的索引位置
  showPlayList: false, //是否展示播放列表
  currentSong: {} as ISongData,
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSong: (state, action: PayloadAction<ISongData>) => {
      state.currentSong = action.payload;
    },
    changeFullScreen: (state, action: PayloadAction<boolean>) => {
      state.fullScreen = action.payload;
    },
    changePlayingState: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    changeSequecePlayList: (state, action: PayloadAction<Array<ISongData>>) => {
      state.sequencePlayList = action.payload;
    },
    changePlayList: (state, action: PayloadAction<Array<ISongData>>) => {
      state.playList = action.payload;
    },
    changePlayMode: (state, action: PayloadAction<playMode>) => {
      state.mode = action.payload;
    },
    changeCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    changeShowPlayList: (state, action: PayloadAction<boolean>) => {
      state.showPlayList = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayList,
  changePlayMode,
  changePlayingState,
  changeSequecePlayList,
  changeShowPlayList,
} = PlayerSlice.actions;

export const playerState = (state: RootState) => state.player;
export default PlayerSlice.reducer;
