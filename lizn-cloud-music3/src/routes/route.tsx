/** @format */

import * as React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Redirect, BrowserRouter, HashRouter, withRouter, Route, Switch, NavLink} from 'react-router-dom'
import Home from '@/application/Home'
import Recommend from '@/application/Recommend'
import Singers from '@/application/Singers'
import Rank from '@/application/Rank'
import Album from '@/application/Album'
import SingerInfo from '@/application/Singer'
import Player from '@/application/Player'
import './route.less'
const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
}
const DEFAULT_SCENE_CONFIG = {
    enter: 'from-right',
    exit: 'to-exit',
}
const RouterConfig = [
    {
        path: '/recommend',
        component: Recommend,
        sceneConfig: {
            enter: 'from-right',
            exit: 'to-right',
        },
    },
    {
        path: '/recomendDetail/:id',
        component: Album,
        sceneConfig: {
            enter: 'from-bottom',
            exit: 'to-bottom',
        },
    },
    {
        path: '/singer',
        component: Singers,
        sceneConfig: {
            enter: 'from-right',
            exit: 'to-right',
        },
    },
    {
        path: '/singerInfo/:id',
        component: SingerInfo,
        sceneConfig: {
            enter: 'from-bottom',
            exit: 'to-bottom',
        },
    },
    {
        path: '/rank',
        component: Rank,
        sceneConfig: {
            enter: 'from-right',
            exit: 'to-right',
        },
    },
]
const getSceneConfig = location => {
    const matchedRoute = RouterConfig.find(
        config => {
            let configSp = config.path.split('/')
            let lcSp = location.pathname.split('/')
            if (configSp.length >= 2 && lcSp.length >= 2) {
                return configSp[1] === lcSp[1]
            } else {
                return false
            }
        },
        //new RegExp(`^${config.path}$`).test(location.pathname)
    )
    return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG
}
let oldLocation = null
export const App = withRouter(({location, history}) => {
    // 转场动画应该都是采用当前页面的sceneConfig，所以：
    // push操作时，用新location匹配的路由sceneConfig
    // pop操作时，用旧location匹配的路由sceneConfig
    let classNames = ''
    if (history.action === 'PUSH') {
        classNames = 'forward-' + getSceneConfig(location).enter
    } else if (history.action === 'POP' && oldLocation) {
        classNames = 'back-' + getSceneConfig(oldLocation).exit
    }
    console.log(classNames)
    // 更新旧location
    oldLocation = location
    return (
        <div>
            <div style={{position: 'relative', zIndex: 100}}>
                <div className="indexTop">
                    <span className="iconfont menu">&#xe65c;</span>
                    <span className="title">网易音乐</span>
                    <span className="iconfont search">&#xe62b;</span>
                </div>
                <div className="tab">
                    <NavLink to="/recommend" activeClassName="selected">
                        <div className="tabItem">
                            <span>推荐</span>
                        </div>
                    </NavLink>
                    <NavLink to="/singer" activeClassName="selected">
                        <div className="tabItem">
                            <span>歌手</span>
                        </div>
                    </NavLink>
                    <NavLink to="/rank" activeClassName="selected">
                        <div className="tabItem">
                            <span>排行榜</span>
                        </div>
                    </NavLink>
                </div>
            </div>
            <Player></Player>
            <TransitionGroup
                className={'router-wrapper'}
                // childFactory={(child) =>
                //   React.cloneElement(child, {
                //     classNames: ANIMATION_MAP[history.action],
                //   })
                // }
                childFactory={child => React.cloneElement(child, {classNames})}>
                <CSSTransition timeout={500} key={location.pathname}>
                    <Switch location={location}>
                        {RouterConfig.map((config, index) => (
                            <Route exact key={index} path={config.path} component={config.component} />
                        ))}
                        {/* <Route path="/recommend" exact component={Recommend} />
          <Route path="/recomendDetail/:id" exact component={Album} />
          <Route path="/singer" exact component={Singers} />
          <Route path="/singerInfo/:id" component={SingerInfo} />
          <Route path="/rank" exact component={Rank} /> */}
                        <Redirect to="/recommend"></Redirect>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
})
