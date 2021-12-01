import React, { Suspense, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Loadable from 'react-loadable'
import logo from './logo.svg';
import './App.css';
//import Prototype from '../src/components/01prototype'
//import Scope from '../src/components/02scope'
//import ExecutionContext from '../src/components/03.executioncontext'
//import Simulation from '../src/components/06simulation'
import StateReact from '../src/components/04.stateReact'
//import Pro from '../src/components/07promise'
// import QrCode from '../src/components/08eventReact'

import ContextReact from '../src/components/09contextReact'
//import BoundaryReact from '../src/components/10boundaryReact'

//import PortalsReact from '../src/components/11PortalsReact'

// import ProfilerReact from '../src/components/12profilerReact'

// import RefReact from '../src/components/13refReact'

// import ForwardRefHocReact from './components/14forwardRefHocReact'
// function App() {
//   let inputRef = React.createRef();
//   useEffect(()=> {
//    inputRef.current.onFocus();
//   })
//   return <ForwardRefHocReact ref={inputRef} />;
// }

//import ForwardRefReact from './components/14forwardRefHocReact'
//import PersistReact from '../src/components/15persistReact'
// import RenderPropsReact from '../src/components/16renderPropsReact'
//  import HocReact from '../src/components/17hoc'

//  import TwoWayBindingReact from '../src/components/18twoWayBindingReact'
//  import StaticReact from '../src/components/19staticReact'
// import Windowing from '../src/components/20windowing'
//import DefaultProps from '../src/components/21defaultProps'
const Loading = () => <div>Loading...</div>
const Windowing = Loadable({
    loader: () => import('../src/components/20windowing'),
    loading: Loading
})// React.lazy(() => import('../src/components/20windowing'))
const DefaultProps = Loadable({
    loader: () => import('../src/components/21defaultProps'),//React.lazy(() => ,
    loading: Loading
})
const FindDOMNodeCom = Loadable({
    loader: () => import('../src/components/22findDOMNode.React'),//React.lazy(() => ,
    loading: Loading
})
const TestIframe = Loadable({
    loader: () => import('../src/components/23testIframe'),//React.lazy(() => ,
    loading: Loading
})
const ConstrutorReact = Loadable({
    loader: () => import('../src/components/21construtorReact'),//React.lazy(() => ,
    loading: Loading
})


const Combination = Loadable({
    loader: () => import('../src/components/24combination'),
    loading: Loading
})
const Hooks = Loadable({
    loader: () => import('../src/components/25hooks'),
    loading: Loading
})
const PerformanceList = Loadable({
    loader: () => import('../src/components/26performanceList'),
    loading: Loading
})
// React.lazy(() => import('../src/components/21defaultProps'))
function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Windowing">Windowing</Link>
                        </li>

                        <li>
                            <Link to="/Windowing1">Windowing1</Link>
                        </li>
                        <li>
                            <Link to="/DefaultProps">DefaultProps</Link>
                        </li>
                        <li>
                            <Link to="/FindDOMNodeCom">FindDOMNodeCom</Link>
                        </li>
                        <li>
                            <Link to="/TestIframe">TestIframe</Link>
                        </li>
                        <li>
                            <Link to="/ConstrutorReact">ConstrutorReact</Link>
                        </li>
                        <li>
                            <Link to="/Combination">Combination</Link>
                        </li>
                        <li>
                            <Link to="/hooks">hooks</Link>
                        </li>
                        <li>
                            <Link to='/performanceList'>PerformanceList</Link>
                        </li>
                    </ul>
                </nav> */}
                <div>


                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/Windowing" component={Windowing} />
                        <Route path="/Windowing1" component={Windowing} />
                        <Route path='/DefaultProps' component={DefaultProps} />
                        <Route path='/FindDOMNodeCom' component={FindDOMNodeCom} />
                        <Route path='/TestIframe' component={TestIframe} />
                        <Route path='/ConstrutorReact' component={ConstrutorReact} />
                        <Route path='/Combination' component={Combination} />
                        <Route path='/hooks' component={Hooks} />
                        <Route path='/performanceList' component={PerformanceList}></Route>

                    </Switch>

                </div>
            </div>
        </Router>
    )
}


export default App;
