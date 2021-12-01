import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { AlbumState, IAlbumData } from "@/interfaces/album";
import { RootState } from "@/store/index";
const initialState: AlbumState = {
  currentAlbum: {} as IAlbumData,
  enterLoading: true,
};

export const AlbumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    },
    changeCurrentAlbumAction: (state, action) => {
      state = action.payload;
    },
    changeCurrentAlbumSuccess: (state, action: PayloadAction<IAlbumData>) => {
      state.currentAlbum = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeEnterLoading,
  changeCurrentAlbumAction,
  changeCurrentAlbumSuccess,
} = AlbumSlice.actions;

export const albumState = (state: RootState) => state.album;
export default AlbumSlice.reducer;
