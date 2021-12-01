/** @format */

import * as React from 'react'
import LazyLoad from 'react-lazyload'
import {withRouter} from 'react-router-dom'
import {IRecommendProps} from '@/interfaces/recommend'
import './index.less'
function RecommendList(props: IRecommendProps) {
    const enterDetail = (id: string) => {
        props.history.push(`/recomendDetail/${id}`)
    }
    return (
        <div className="listWrapper">
            <h1 className="title">推荐歌单</h1>
            <div className="list">
                {props.recommendList.map(item => {
                    return (
                        <div className="listItem" key={item.id} onClick={() => enterDetail(item.id)}>
                            <div className="img_wrapper">
                                <div className="decorate"></div>
                                <LazyLoad
                                    placeholder={
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={require('../../assets/music.png')}
                                            alt="music"
                                        />
                                    }>
                                    <img src={item.picUrl + '?param=300x300'} width="100%" height="100%" alt="music" />
                                </LazyLoad>
                                <div className="play_count">
                                    <i className="iconfont play">&#xe885;</i>
                                    <span className="count">{Math.floor(item.playCount / 10000)}万</span>
                                </div>
                            </div>
                            <div className="desc">{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default withRouter(React.memo(RecommendList))
