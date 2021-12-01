/** @format */

import * as React from "react";
import Scroll from "@/baseUI/scroll";
import { filterIndex } from "@/api/utils";
import { useDispatch, useSelector } from "react-redux";
import { rankState, changeRankListAction } from "@/slice/rankSlice";
import Loading from "@/baseUI/loading/index";
import "./rank.less";
const { useEffect, useState } = React;
function Index(props: any) {
  const dispatch = useDispatch();
  const { enterLoading, rankList } = useSelector(rankState);
  const { route } = props;
  useEffect(() => {
    if (rankList.length <= 0) {
      console.log(111);
      dispatch(changeRankListAction());
    }
  }, []);
  const enterDetail = (detail) => {
    props.history.push(`/recomendDetail/${detail.id}`);
  };
  const renderSongList = (list) => {
    return list.length ? (
      <div className="song-list">
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </div>
    ) : null;
  };
  const renderRankList = (list, global) => {
    return (
      <ul className="rank-list">
        {list.map((item, index) => {
          return (
            <li
              className="rank-listItem"
              key={`${item.coverImgId}${index}`}
              //   tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </li>
          );
        })}
      </ul>
    );
  };
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);
  let displayStyle = enterLoading ? { display: "none" } : { display: "" };
  return (
    <div className="rank-container">
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList, false)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {enterLoading ? (
            <div className="enterLoading">
              <Loading></Loading>
            </div>
          ) : null}
        </div>
      </Scroll>
    </div>
  );
}

export default React.memo(Index);
