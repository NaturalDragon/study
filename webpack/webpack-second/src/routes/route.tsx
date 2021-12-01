/** @format */

import * as React from 'react'
import {Redirect, BrowserRouter, HashRouter, Route, Switch, NavLink} from 'react-router-dom'
import Home from '@/application/Home'
import Recommend from '@/application/Recommend'
import Singers from '@/application/Singers'
import Rank from '@/application/Rank'
import Album from '@/application/Album'
import SingerInfo from '@/application/Singer'
import Player from '@/application/Player'
import './route.less'
// export default [
//   {
//     path: "/",
//     component: Home,
//     routes: [
//       {
//         path: "/",
//         exact: true,

//       },
//       {
//         path: "/recommend",
//         component: Recommend
//       },
//       {
//         path: "/singers",
//         component: Singers
//       },
//       {
//         path: "/rank",
//         component: Rank
//       }
//     ]
//   }
// ]

function Header() {
    return (
        <div>
            <div className="top">
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">WebApp</span>
                <span className="iconfont search">&#xe62b;</span>
            </div>
            <div className="tab">
                <NavLink to="/recommend" activeClassName="selected">
                    <div className="tabItem">
                        <span>推荐</span>
                    </div>
                </NavLink>
                <NavLink to="/singers" activeClassName="selected">
                    {' '}
                    <div className="tabItem">
                        <span>歌手</span>
                    </div>
                </NavLink>
                <NavLink to="/rank" activeClassName="selected">
                    {' '}
                    <div className="tabItem">
                        <span>排行榜</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

// function Main({match}) {
//     return (
//         <Switch>
//             <Route path={`${match.path}`} exact component={Recommend} />
//             <Route path={`${match.path}/child/id`} exact component={Album} />
//             <Redirect to={`${match.url}`} />
//         </Switch>
//     )
// }
function App() {
    return (
        <HashRouter>
            <div>
                <div style={{position: 'relative', zIndex: 100}}>
                    <div className="indexTop">
                        <span className="iconfont menu">&#xe65c;</span>
                        <span className="title">WebApp</span>
                        <span className="iconfont search">&#xe62b;</span>
                    </div>
                    <div className="tab">
                        <NavLink to="/recommend" activeClassName="selected">
                            <div className="tabItem">
                                <span>推荐</span>
                            </div>
                        </NavLink>
                        <NavLink to="/singers" activeClassName="selected">
                            {' '}
                            <div className="tabItem">
                                <span>歌手</span>
                            </div>
                        </NavLink>
                        <NavLink to="/rank" activeClassName="selected">
                            {' '}
                            <div className="tabItem">
                                <span>排行榜</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <Player></Player>
                <Switch>
                    <Route path="/recommend" exact component={Recommend} />
                    <Route path="/recomendDetail/:id" exact component={Album} />
                    <Route path="/singers" exact component={Singers} />
                    <Route path="/singerInfo/:id" component={SingerInfo} />
                    <Route path="/rank" exact component={Rank} />
                    <Redirect to="/recommend"></Redirect>
                </Switch>
            </div>
        </HashRouter>
    )
}

export default App
