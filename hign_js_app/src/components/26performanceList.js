import React, { useEffect, useState, useRef,useCallback ,useMemo} from 'react'
import './css/perList.css'
function debounce(fun, wait, immediate) {
    var timeout;
    var reslut;
    var debounced = function () {
        var _this = this;
        var arg = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) reslut = fun.apply(_this, arg)
        }
        else {
            timeout = setTimeout(function () {
                fun.apply(_this, arg)
            }, wait)
        }
        return reslut;
    }
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    }
    return debounced;
}
function PerformanceList(props) {
    const { listData,itemSize } = props;
    //const [listData, setListData] = useState([]);
    //const [itemSize, setItemSize] = useState(50)

    const [screenHeight, setScreenHeight] = useState(0)
    const [startOffset, setStartOffset] = useState(0)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const listRef = useRef()
    useEffect(() => {
        let clientHeight = window.innerHeight;
        setScreenHeight(c => clientHeight)
        setStart(0)
        let vC = visibleCount(clientHeight)

        let endx = start + vC;
        setEnd(endx)
    }, [])
  
    //偏移量对应的style
    const getTransform = () => {
        return `translate3d(0,${startOffset}px,0)`;
    }
    //可显示的列表项数
    const visibleCount = (h) => {
        let currentH = h | screenHeight
        return Math.ceil(currentH / itemSize)
    }

    //获取真实显示列表数据
    const visibleData = listData.slice(start, Math.min(end, listData.length));

  
    const scrollEvent = (e) => {
        console.log(e)
        //当前滚动位置
        let scrollTop = listRef.current.scrollTop;
        //此时的开始索引
        let startX = Math.floor(scrollTop / itemSize);
        //此时的结束索引
        let endX = startX + visibleCount();
        //此时的偏移量
        let startOffsetX = scrollTop - (scrollTop % itemSize);
        setStart(startX)
        setEnd(endX)
        setStartOffset(startOffsetX)
    }
    const scrollDebounce=useMemo(()=>{
        return debounce(scrollEvent,10)
    },[itemSize,scrollEvent])

    return <>
        <div ref={listRef} className="infinite-list-container" onScroll={scrollDebounce}>
            <div className="infinite-list-phantom" style={{ height: listData.length * itemSize |0}}></div>
            <div className="infinite-list" style={{ transform: getTransform() }}>
                {
                    visibleData.map(item => <div
                        className="infinite-list-item"
                        style={{ height: itemSize, lineHeight: itemSize + 'px' }}
                    >{item}</div>)
                }

            </div>
        </div>

    </>
}
function Index() {
    var initList = []
    for (let index = 0; index < 10000; index++) {
        initList.push(index)
    }
    const [list, setList] = useState(initList)
    useEffect(() => {

    }, [])
    return (
        <PerformanceList listData={list} itemSize={50}></PerformanceList>
    )
}

export default Index