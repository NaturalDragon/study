/** @format */

import {formatPlayTime} from '@/api/utils'
import * as React from 'react'
import './progressBar.less'
import {IProgressBarProps, ITouchData} from '@/interfaces/player'
const {useEffect, useRef, useState} = React
const progressBtnWidth = 16

function ProgressBar(props: IProgressBarProps) {
    const {percent} = props
    const {percentChange} = props
    const progressBar = useRef<HTMLDivElement>()
    const progress = useRef<HTMLDivElement>()
    const progressBtn = useRef<HTMLDivElement>()
    const [touch, setTouch] = useState<ITouchData>({initiated: false, startX: 0, left: 0})

    useEffect(() => {
        if (percent >= 0 && percent <= 1 && !touch.initiated) {
            const barWidth = progressBar.current.clientWidth
            const offsetWidth = percent * barWidth
            _offset(offsetWidth)
        }
    }, [percent])
    const _offset = (offsetWidth: number) => {
        progress.current.style.width = `${offsetWidth}px`
        progressBtn.current.style.transform = `translate3d(${offsetWidth}px,0,0)`
    }
    const _changePercent = () => {
        const barWidth = progressBar.current.clientWidth
        const progressWidth = progress.current.clientWidth
        const currentPercent = progressWidth / barWidth
        console.log(currentPercent)
        percentChange(currentPercent)
    }
    const progressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const startTouch: ITouchData = {initiated: true, startX: 0, left: 0}
        startTouch.initiated = true
        startTouch.startX = e.touches[0].pageX
        startTouch.left = progress.current.clientWidth
        console.log(startTouch)
        setTouch(startTouch)
    }
    const progressToucnMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touch.initiated) return
        const deltaX = e.touches[0].pageX - touch.startX
        const barWidth = progressBar.current.clientWidth
        const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
        console.log(offsetWidth)
        _offset(offsetWidth)
        _changePercent()
    }
    const progressTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const endTouch = JSON.parse(JSON.stringify(touch))
        endTouch.initiated = false
        setTouch(endTouch)
    }

    const progressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = progressBar.current.getBoundingClientRect()
        console.log(rect)
        console.log(e.pageX)
        const offsetWidth = e.pageX - rect.left
        _offset(offsetWidth)
        _changePercent()
    }
    return (
        <div className="progressBarWrapper">
            <div className="bar-inner" ref={progressBar} onClick={progressClick}>
                <div className="progress" ref={progress}></div>
                <div
                    className="progress-btn-wrapper"
                    ref={progressBtn}
                    onTouchStart={progressTouchStart}
                    onTouchMove={progressToucnMove}
                    onTouchEnd={progressTouchEnd}>
                    <div className="progress-btn"></div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProgressBar)
