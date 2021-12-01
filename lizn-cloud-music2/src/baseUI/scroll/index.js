import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import Loading from '../loading/index'
import Loading2 from '../loading-v2/index'
import styled from 'styled-components';
import { debounce } from "../../api/utils";
const ScrollContainer = styled.div`
width:100%;
height:100%;
overflow:hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

const Scroll = forwardRef((props, ref) => {
    const { click, direction, refresh, bounceTop, bounceBottom,pullDownLoading,pullUpLoading } = props;
    const { pullUp, pullDown, onScroll } = props
    const [bScroll, setBScroll] = useState()
    const scrollContaninerRef = useRef()
    let pullUpDebounce=useMemo(()=>{
        return debounce(pullUp,500)
    },[pullUp])
    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 500)
      }, [pullDown]);
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            click: click,
            probeType: 3,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }

        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])

    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', onScroll);
        return () => {
            bScroll.off('scroll', onScroll)
        }
    })
    useEffect(() => {
        if (!bScroll || !pullUp) return;
        const handlePullUp = () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce();
            }
        };
        bScroll.on('scrollEnd', handlePullUp);
        return () => {
            bScroll.off('scrollEnd', handlePullUp);
        }
    }, [pullUp, pullUpDebounce, bScroll]);

    useEffect(() => {
        if (!bScroll || !pullDown) return;
        const handlePullDown = (pos) => {
            //判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce();
            }
        };
        bScroll.on('touchEnd', handlePullDown);
        return () => {
            bScroll.off('touchEnd', handlePullDown);
        }
    }, [pullDown, pullDownDebounce, bScroll]);

    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh()
        }
    })
    useImperativeHandle(ref,()=>({
        refresh(){
            if(bScroll){
                bScroll.refresh();
                bScroll.scrollTo(0,0)
            }
        },
        getBScroll(){
            if(bScroll){
                return bScroll;
            }
        }
    }))
    const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
    const pullDowndisplayStyle=pullDownLoading?{display:''}:{display:'none'}
    return (
        <ScrollContainer ref={scrollContaninerRef}>
            
            {props.children}
            <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
            <PullDownLoading style={ pullDowndisplayStyle }><Loading2></Loading2></PullDownLoading>
        </ScrollContainer>
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
    bounceBottom: true
}
Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    click:  PropTypes.bool,// 是否支持点击
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
};
export default Scroll;