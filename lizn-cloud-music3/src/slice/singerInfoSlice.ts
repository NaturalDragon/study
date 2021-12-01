import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { SingerInfoState, IArtistInfo } from "@/interfaces/singerInfo";
import { RootState } from "@/store/index";
const initialState: SingerInfoState = {
  artistInfo: {
    artist: {
      name: "",
      picUrl: "",
    },
    hotSongs: [],
  },
  enterLoading: true,
};

export const SingerInfoSlice = createSlice({
  name: "singerInfo",
  initialState,
  reducers: {
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    },
    changeArtistInfoAction: (state, action) => {
      state = action.payload;
    },
    changeArtistInfoSuccess: (state, action: PayloadAction<IArtistInfo>) => {
      state.artistInfo = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeEnterLoading,
  changeArtistInfoAction,
  changeArtistInfoSuccess,
} = SingerInfoSlice.actions;

export const singerInfoState = (state: RootState) => state.singerInfo;
export default SingerInfoSlice.reducer;
