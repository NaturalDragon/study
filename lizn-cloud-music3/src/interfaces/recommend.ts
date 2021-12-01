/** @format */

import { List } from "immutable";
import { RouteComponentProps } from "react-router";
export interface RecommendState {
  bannerList: Array<IBanner>;
  recommendList: Array<IRecommend>;
  enterLoading: boolean;
}
export interface IProps {
  bannerList: List<IBanner>;
  recommendList: List<IRecommend>;
  enterLoading: boolean;
  getBannerDataDispatch: Function;
  getRecommendDataDispatch: Function;
}

export interface IRecommendProps extends RouteComponentProps {
  recommendList: Array<IRecommend>;
}
export interface IRecommend {
  id: string;
  picUrl: string;
  playCount: number;
  name: string;
}
export interface IBannerProps {
  bannerList: Array<IBanner>;
}
export interface IBanner {
  imageUrl: string;
}
