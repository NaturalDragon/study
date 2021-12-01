/** @format */

import * as React from "react";
import { Map } from "immutable";
import { getName } from "@/api/utils";
import { ISongData, ISongProps } from "@/interfaces/song";
import {
  changePlayList,
  changeCurrentIndex,
  changeSequecePlayList,
} from "@/slice/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import "./song.less";

function SongList(props: ISongProps) {
  const dispatch = useDispatch();
  const changePlayListDispatch = (data: Array<ISongData>) => {
    dispatch(changePlayList(data));
  };
  const changeCurrentIndexDispatch = (data: number) => {
    dispatch(changeCurrentIndex(data));
  };
  const changeSequecePlayListDispatch = (data: Array<ISongData>) => {
    dispatch(changeSequecePlayList(data));
  };
  // const {
  //   changePlayListDispatch,
  //   changeCurrentIndexDispatch,
  //   changeSequecePlayListDispatch,
  // } = props;

  // 接受触发动画的函数
  const { musicAnimation } = props;
  const { collectCount, songs, showCollect } = props;
  const selectItem = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };
  return (
    <div className="songList">
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            {" "}
            播放全部 <span className="sum">(共 {songs.length} 首)</span>
          </span>
        </div>
        {showCollect && (
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span> 收藏 ({collectCount})</span>
          </div>
        )}
      </div>
      <div className="songItem">
        {songs.map((item, index) => {
          return (
            <li
              key={index}
              onClick={(e) => {
                selectItem(e, index);
              }}
            >
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
export default SongList;
