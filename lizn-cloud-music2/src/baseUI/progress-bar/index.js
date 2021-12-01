import React, { useEffect, useRef, useState } from 'react'
import './index.less'


const progressBtnWidth=16;

function ProgressBar(props) {
    const {percent}=props
    const {percentChange}=props
    const progressBar=useRef();
    const progress=useRef();
    const progressBtn=useRef();
    const[touch,setTouch]=useState({})

    useEffect(()=>{
        if(percent>=0&&percent<=1&&!touch.initiated){
        const barWidth=progressBar.current.clientWidth;
        const offsetWidth=percent*barWidth;
        _offset(offsetWidth)
        }
    },[percent])
    const _offset=(offsetWidth)=>{
        progress.current.style.width=`${offsetWidth}px`;
        progressBtn.current.style.transform=`translate3d(${offsetWidth}px,0,0)`
    }
    const _changePercent=()=>{
        const barWidth=progressBar.current.clientWidth;
        const progressWidth=progress.current.clientWidth;
        const currentPercent=progressWidth/barWidth
        console.log(currentPercent)
        percentChange(currentPercent)
    }
    const progressTouchStart=(e)=>{
        const startTouch={}
        startTouch.initiated=true;
        startTouch.startX=e.touches[0].pageX;
        startTouch.left=progress.current.clientWidth;
        console.log(startTouch)
        setTouch(startTouch)

    }
    const progressToucnMove=(e)=>{
        if(!touch.initiated)return;
        const deltaX=e.touches[0].pageX-touch.startX;
        const barWidth=progressBar.current.clientWidth;
        const offsetWidth=Math.min(Math.max(0,touch.left+deltaX),barWidth)
        console.log(offsetWidth)
        _offset(offsetWidth)
        _changePercent()
    }
    const progressTouchEnd = (e) => {
        const endTouch = JSON.parse (JSON.stringify (touch));
        endTouch.initiated = false;
        setTouch (endTouch);
      }

      const progressClick=(e)=>{
            const rect=progressBar.current.getBoundingClientRect();
            console.log(rect)
            console.log(e.pageX )
            const offsetWidth=e.pageX-rect.left;
            _offset(offsetWidth)
            _changePercent()
      }
        return (<div className='progressBarWrapper'>
        <div className="bar-inner" ref={progressBar} onClick={progressClick}>
            <div className="progress" ref={progress}></div>
            <div className="progress-btn-wrapper" ref={progressBtn}

                onTouchStart={progressTouchStart}
                onTouchMove={progressToucnMove}
                onTouchEnd={progressTouchEnd}
                >
                
                <div className="progress-btn"></div>
            </div>
        </div>
    </div>)
}

export default React.memo(ProgressBar)