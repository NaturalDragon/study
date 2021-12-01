import * as  React from 'react';
import{CSSTransition} from 'react-transition-group'
import ProgressCircle  from '@/baseUI/progress-circle'
import './miniPlayer.less'
import {getName}from '@/api/utils'
import {IMiniPlayerProps} from '@/interfaces/player'
const { useRef }=React
function MiniPlayer(props:IMiniPlayerProps) {
    const { song,fullScreen,playing ,percent} = props
    const {toggleFullScreen,clickPlaying} =props
    const miniPlayerRef=useRef<HTMLDivElement>()
    return (<CSSTransition
            in={!fullScreen}
            classNames='mini'
            timeout={100}
            mountOnEnter={true}
            onEnter={()=>{
                miniPlayerRef.current.style.display='flex'
            }}
            onExited={()=>{
                miniPlayerRef.current.style.display='none'
            }}
    >
    <div className='mini-player-container' ref={miniPlayerRef} onClick={()=>toggleFullScreen(true)}>
        <div className='icon'>
            <div className='imgWrapper'>
                <img className={`play ${playing?'':'pause'}`} style={{ backgroundImage: `url(${song.al.picUrl})` }}
                    width='40' height='40'></img>
            </div>
        </div>
        <div className='min-text'>
            <div className='name'>{song.name}</div>
            <div className='desc'>{getName(song.ar)}</div>
        </div>
        <div className="control">
            <ProgressCircle radius={32} percent={percent}>
                {
                    playing?
                    <i className=" icon-mini iconfont icon-play" onClick={e=>clickPlaying(e,false)}>&#xe650;</i>
                    :
                    <i className=" icon-mini iconfont icon-play" onClick={e=>clickPlaying(e,true)}>&#xe61e;</i>

                }
          
            </ProgressCircle>
         
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
    </div></CSSTransition>)
}

export default React.memo(MiniPlayer) 