import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { RankState } from "@/interfaces/rank";
import { RootState } from "@/store/index";
const initialState: RankState = {
  rankList: [],
  enterLoading: true,
};

export const RankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    },
    changeRankListAction: () => {},
    changeRankListSuccess: (state, action: PayloadAction<Array<object>>) => {
      state.rankList = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeEnterLoading,
  changeRankListAction,
  changeRankListSuccess,
} = RankSlice.actions;

export const rankState = (state: RootState) => state.rank;
export default RankSlice.reducer;
