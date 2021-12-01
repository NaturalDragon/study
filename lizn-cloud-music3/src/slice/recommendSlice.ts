import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { RecommendState, IBanner, IRecommend } from "@/interfaces/recommend";
import { RootState } from "@/store/index";
const initialState: RecommendState = {
  bannerList: [] as Array<IBanner>,
  recommendList: [] as Array<IRecommend>,
  enterLoading: true,
};

export const RecommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    },
    getBannerListAction: () => {},
    getBannerListSuccess: (state, action: PayloadAction<Array<IBanner>>) => {
      state.bannerList = action.payload;
    },
    getRecommendListAction: () => {},
    getRecommendListSuccess: (
      state,
      action: PayloadAction<Array<IRecommend>>
    ) => {
      state.recommendList = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeEnterLoading,
  getBannerListAction,
  getBannerListSuccess,
  getRecommendListAction,
  getRecommendListSuccess,
} = RecommendSlice.actions;

export const recommendState = (state: RootState) => state.recommend;
export default RecommendSlice.reducer;
