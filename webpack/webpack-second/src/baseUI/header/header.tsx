/** @format */

import * as React from 'react'
import {IHeaderProps} from '@/interfaces/header'
import './header.less'
// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef((props: IHeaderProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const {handleClick, title, isMarquee} = props
    return (
        <div className="headerContainer" ref={ref}>
            <i className="iconfont back" onClick={handleClick}>
                &#xe655;
            </i>
            {isMarquee ? (
                <h1 className="Marquee">
                    <div className="text">{title}</div>
                </h1>
            ) : (
                <h1>{title}</h1>
            )}

            {/* <marquee>{title}</marquee> */}
        </div>
    )
})

Header.defaultProps = {
    handleClick: () => {},
    title: '标题',
    isMarquee: false,
}

export default React.memo(Header)
