/** @format */

import * as React from 'react'
import Scroll from '@/baseUI/scroll'
const {useState, useRef, useEffect, memo} = React
import {IHorizenProps, IHorizenData} from '@/interfaces/horizen'
import './horizen.less'

function Horizen(props: IHorizenProps) {
    const {list, title, value} = props
    const {handleClick} = props
    const Category = useRef<HTMLInputElement>()
    useEffect(() => {
        let categoryDOM = Category.current
        let tagElemets = categoryDOM.querySelectorAll('span')
        let totalwidth = 0
        Array.from(tagElemets).forEach(ele => {
            totalwidth += ele.offsetWidth
        })
        // totalwidth += 2;
        categoryDOM.style.width = `${totalwidth}px`
    })
    const clickHandle = (item: IHorizenData) => {
        handleClick(item.key)
    }
    return (
        <Scroll direction="horizental" refresh={true}>
            <div ref={Category}>
                <div className="horizen_list">
                    <span>{title}</span>
                    {list.map(ele => {
                        return (
                            <span
                                className={`horizen_listItem ${ele.key === value ? 'selected' : ''}`}
                                onClick={() => {
                                    clickHandle(ele)
                                }}
                                key={ele.key}>
                                {ele.name}
                            </span>
                        )
                    })}
                </div>
            </div>
        </Scroll>
    )
}

Horizen.defaultProps = {
    title: '',
    value: '',
    list: [],
    handleClick: null,
}
// Horizen.propTypes = {
//     title:PropTypes.string,
//     value:PropTypes.string,
//     list: PropTypes.array,
//     handleClick: PropTypes.func
// }

export default memo(Horizen)
