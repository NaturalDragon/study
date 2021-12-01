import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import Toast from '../../baseUI/toast'
import { getSongUrl, isEmptyObject, shuffle, findIndex } from '../../api/utils'
import {
  changeCurrentIndex, changeFullScreen, changePlayMode,
  changeCurrentSong, changePlayList, changePlayingState, changeSequecePlayList, changeShowPlayList
} from '../../actions/player'
import { playMode } from '../../api/config'
// const currentSong = {
//   al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
//   name: "木偶人",
//   ar: [{ name: "薛之谦" }]
// }



function Player(props) {
  const audioRef = useRef()
  const {
    fullScreen,
    playing,
    currentIndex,
    mode,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    sequencePlayList: immutableSequencePlayList
  } = props


  const { toggleFullScreenDispatch, togglePlayingDispatch, changeModeDispatch, changeCurrentIndexDispatch, changeCurrentDispatch, changePlayListDispatch } = props;
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [preSong, setPreSong] = useState({})
  const [modeText, setModeText] = useState('')
  const toastRef = useRef()
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const playList = immutablePlayList.toJS()
  const currentSong = immutableCurrentSong.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()
  useEffect(() => {
    changeCurrentIndexDispatch(0);
  }, [])
  useEffect(() => {
    if (currentIndex === -1 || !playList[currentIndex] || playList[currentIndex].id === preSong.id) return
    changeCurrentIndexDispatch(currentIndex);
    let current = playList[currentIndex];
    changeCurrentDispatch(current);
    setPreSong(current)
    audioRef.current.src = getSongUrl(current.id)
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = 1;
    togglePlayingDispatch(true);//播放状态
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
  }, [currentIndex])
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing])
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };
  const updateTime = (e) => {
    console.log(e.target.currentTime)
    setCurrentTime(e.target.currentTime)
  }
  const onProgressChange = (currentPercent) => {
    console.log(`currentPercent:${currentPercent}`)
    const newTime = currentPercent * duration;
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  }

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    //  audioRef.current.play()
  }
  //上一首
  const handlePre = () => {
    if (playList.length === 1) {
      handleLoop();
      return
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }
  //下一首
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    }
    else {
      handleNext()
    }
  }
  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");

    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show()
  };
  return (
    <div>
      <audio onTimeUpdate={updateTime} ref={audioRef} onEnded={handleEnd}></audio>
      {
        !isEmptyObject(currentSong) ? <MiniPlayer
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          playing={playing}
          clickPlaying={clickPlaying}
          percent={percent}
          song={currentSong}></MiniPlayer> : null
      }
      {
        !isEmptyObject(currentSong) ? <NormalPlayer
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          playing={playing}
          clickPlaying={clickPlaying}
          song={currentSong}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          onProgressChange={onProgressChange}
          handlePre={handlePre}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
        ></NormalPlayer> : null
      }
      <Toast text={modeText} ref={toastRef}></Toast>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    fullScreen: state.getIn(['player', 'fullScreen']),
    playing: state.getIn(["player", "playing"]),
    currentSong: state.getIn(["player", "currentSong"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))