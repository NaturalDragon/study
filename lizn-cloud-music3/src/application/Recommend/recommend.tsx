/** @format */

import * as React from "react";
import { Map } from "immutable";
import { renderRoutes } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@/components/slider/index";
import RecommendList from "@/components/list";
import Loading from "@/baseUI/loading-v2/index";
import Scroll from "@/baseUI/scroll/index";
import { forceCheck } from "react-lazyload";
import { IScrollFunc } from "@/interfaces/scroll";
import { IProps } from "@/interfaces/recommend";
import {
  recommendState,
  getBannerListAction,
  getRecommendListAction,
} from "@/slice/recommendSlice";
import "./recommend.less";

function Recommend(props: IProps) {
  const dispatch = useDispatch();
  const { bannerList, recommendList, enterLoading } = useSelector(
    recommendState
  );
  //const { getBannerDataDispatch, getRecommendDataDispatch } = props;
  const bannerListJS = bannerList;
  const recommendListJS = recommendList;
  //  const scrollRef = React.useRef<IScrollFunc>()
  React.useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerListAction());
    }
    if (!recommendList.length) {
      dispatch(getRecommendListAction());
    }
  }, []);

  return (
    <div className="content">
      <Scroll onScroll={forceCheck}>
        <div>
          <div className="before"></div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading && <Loading></Loading>}
      {/* {
            renderRoutes(props.route.routes)
        } */}
    </div>
  );
}
export default Recommend;
