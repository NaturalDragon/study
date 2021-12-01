/** @format */

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "immutable";
import { CSSTransition } from "react-transition-group";
import Header from "@/baseUI/header/index";
import Scroll from "@/baseUI/scroll/index";
import MusicNote from "@/baseUI/music-note";
import Loading from "@/baseUI/loading/index";
import style from "@/assets/global-style";
import { isEmptyObject } from "@/api/utils";
import SongList from "../SongList/index";
import { IMusicNoteRef } from "@/interfaces/musiceNote";
import { IAblumProps } from "@/interfaces/album";
import { albumState, changeCurrentAlbumAction } from "@/slice/albumSlice";
import "./album.less";
const { useEffect, useRef, useState } = React;
export const HEADER_HEIGHT = 45;
const TITLE = "歌单";
function Album(props: IAblumProps) {
  //   const { currentAlbum, enterLoading } = props;
  //   const { getAlbumDataDispatch } = props;
  const dispatch = useDispatch();
  const { currentAlbum, enterLoading } = useSelector(albumState);
  const currentAlbumJS = currentAlbum;
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState(TITLE);
  const [isMarquee, setIsMarquee] = useState(false);
  const headerEl = useRef<HTMLDivElement>();
  const id = props.match.params.id;
  const musicNoteRef = useRef<IMusicNoteRef>();
  useEffect(() => {
    dispatch(
      changeCurrentAlbumAction({
        id,
      })
    );
  }, [id]);

  const musicAnimation = (x: number, y: number) => {
    if (musicNoteRef) {
      musicNoteRef.current.startAnimation({ x, y });
    }
  };

  const handleBack = () => {
    // history.pushState(null, null, document.URL);
    props.history.goBack();
    setShowStatus(false);
  };
  const handelScroll = (e: MouseEvent) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(e.y / minScrollY);
    let headerDom = headerEl.current;
    if (e.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      let opacity = Math.min(1, (percent - 1) / 2);
      headerDom.style.opacity = opacity + "";
      setTitle(currentAlbumJS.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1 + "";
      setTitle(TITLE);
      setIsMarquee(false);
    }
  };
  return (
    // <CSSTransition
    //   in={showStatus}
    //   timeout={300}
    //   classNames="fly"
    //   appear={true}
    //   unmountOnExit
    //   onExited={props.history.goBack}
    // >
    <div className="Container">
      <Header
        ref={headerEl}
        title={title}
        handleClick={handleBack}
        isMarquee={isMarquee}
      ></Header>
      <Scroll bounceTop={false} onScroll={handelScroll}>
        {!isEmptyObject(currentAlbumJS) ? (
          <div>
            <div>
              <div className="TopDesc">
                <div className="background">
                  <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={currentAlbumJS.coverImgUrl} alt="" />
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">
                      {Math.floor(currentAlbumJS.subscribedCount / 1000) / 10}{" "}
                      万{" "}
                    </span>
                  </div>
                </div>
                <div className="desc_wrapper">
                  <div className="title">{currentAlbumJS.name}</div>
                  <div className="person">
                    <div className="avatar">
                      <img src={currentAlbumJS.creator.avatarUrl} alt="" />
                    </div>
                    <div className="name">
                      {currentAlbumJS.creator.nickname}
                    </div>
                  </div>
                </div>
              </div>
              <div className="Menu">
                <div>
                  <i className="iconfont">&#xe6ad;</i>
                  评论
                </div>
                <div>
                  <i className="iconfont">&#xe86f;</i>
                  点赞
                </div>
                <div>
                  <i className="iconfont">&#xe62d;</i>
                  收藏
                </div>
                <div>
                  <i className="iconfont">&#xe606;</i>
                  更多
                </div>
              </div>
            </div>
            <SongList
              musicAnimation={musicAnimation}
              showCollect={true}
              collectCount={currentAlbumJS.subscribedCount}
              songs={currentAlbumJS.tracks}
            ></SongList>
            <MusicNote ref={musicNoteRef}></MusicNote>
            {/* <div className='songList'>
                  <div className="first_line">
                    <div className="play_all">
                      <i className="iconfont">&#xe6e3;</i>
                      <span > 播放全部 <span className="sum">(共 {currentAlbumJS.tracks.length} 首)</span></span>
                    </div>
                    <div className="add_list">
                      <i className="iconfont">&#xe62d;</i>
                      <span > 收藏 ({(currentAlbumJS.subscribedCount)})</span>
                    </div>
                  </div>
                  <div className='songItem'>
                    {
                      currentAlbumJS.tracks.map((item, index) => {
                        return (
                          <li key={index}>
                            <span className="index">{index + 1}</span>
                            <div className="info">
                              <span>{item.name}</span>
                              <span>
                                {getName(item.ar)} - {item.al.name}
                              </span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </div>
                </div> */}
          </div>
        ) : null}
        {enterLoading && (
          <div className="enterLoading">
            <Loading></Loading>
          </div>
        )}
      </Scroll>
    </div>
    // </CSSTransition>
  );
}
export default Album;
