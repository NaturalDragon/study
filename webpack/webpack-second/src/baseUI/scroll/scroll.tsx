/** @format */

import * as React from 'react'
import * as PropTypes from 'prop-types'
import BScroll, {BScrollInstance} from 'better-scroll'
import Loading from '@/baseUI/loading/index'
import Loading2 from '@/baseUI/loading-v2/index'
import {Debouce} from '@/api/utils'
import {IScrollProps} from '@/interfaces/scroll'
import './scroll.less'
const {forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo} = React
const Scroll = forwardRef((props: IScrollProps, ref) => {
    const {click, height, direction, refresh, bounceTop, bounceBottom, pullDownLoading, pullUpLoading} = props
    const {pullUp, pullDown, onScroll} = props
    const [bScroll, setBScroll] = useState<BScrollInstance>()
    const scrollContaninerRef = useRef<HTMLDivElement>()
    let pullUpDebounce = useMemo(() => {
        return Debouce.init(pullUp, 500)
    }, [pullUp])
    let pullDownDebounce = useMemo(() => {
        return Debouce.init(pullDown, 500)
    }, [pullDown])
    useEffect(() => {
        if (height) {
            scrollContaninerRef.current.style.height = height + 'px'
        }
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizental',
            scrollY: direction === 'vertical',
            click: click,
            probeType: 3,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom,
            },
        })
        debugger
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])

    useEffect(() => {
        if (!bScroll || !onScroll) return
        bScroll.on('scroll', onScroll)
        return () => {
            bScroll.off('scroll', onScroll)
        }
    })
    useEffect(() => {
        if (!bScroll || !pullUp) return
        const handlePullUp = () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce()
            }
        }
        bScroll.on('scrollEnd', handlePullUp)
        return () => {
            bScroll.off('scrollEnd', handlePullUp)
        }
    }, [pullUp, pullUpDebounce, bScroll])

    useEffect(() => {
        if (!bScroll || !pullDown) return
        const handlePullDown = (pos: MouseEvent) => {
            //判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce()
            }
        }
        bScroll.on('touchEnd', handlePullDown)
        return () => {
            bScroll.off('touchEnd', handlePullDown)
        }
    }, [pullDown, pullDownDebounce, bScroll])

    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh()
        }
    })
    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh()
                bScroll.scrollTo(0, 0)
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll
            }
        },
    }))
    const PullUpdisplayStyle = pullUpLoading ? {display: ''} : {display: 'none'}
    const pullDowndisplayStyle = pullDownLoading ? {display: ''} : {display: 'none'}
    return (
        <div className="scrollContainer" ref={scrollContaninerRef}>
            {props.children}
            <div className="pullUpLoading" style={PullUpdisplayStyle}>
                <Loading></Loading>
            </div>
            <div className="pullDownLoading" style={pullDowndisplayStyle}>
                <Loading2></Loading2>
            </div>
        </div>
    )
})

Scroll.defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true,
}
// Scroll.propTypes = {
//     direction: PropTypes.oneOf(['vertical', 'horizental']),
//     click:  PropTypes.bool,// 是否支持点击
//     refresh: PropTypes.bool,// 是否刷新
//     onScroll: PropTypes.func,// 滑动触发的回调函数
//     pullUp: PropTypes.func,// 上拉加载逻辑
//     pullDown: PropTypes.func,// 下拉加载逻辑
//     pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
//     pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
//     bounceTop: PropTypes.bool,// 是否支持向上吸顶
//     bounceBottom: PropTypes.bool// 是否支持向下吸底
// };
export default Scroll
