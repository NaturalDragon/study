import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
const ScrollContainer = styled.div`
width:100%;
height:100%;
overflow:hidden;
`

const Scroll = forwardRef((props, ref) => {
    const { click, refresh, bounceTop, bounceBottom } = props;
    const [bScroll, setBScroll] = useState()
    const scrollContaninerRef = useRef()
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: true,
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
        if (refresh && bScroll) {
            bScroll.refresh()
        }
    })
    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
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
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否支持向上吸顶
    bounceBottom: PropTypes.bool//是否支持向下吸顶
  };
export default Scroll;