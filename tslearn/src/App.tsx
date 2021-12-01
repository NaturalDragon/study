import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import InterfaceImp from './imp/interfaceImp/index';
import Lyric from './imp/lyric/index';
import ClassImp from './imp/classImp';
import FuncImp from './imp/funcImp';
import GenericImp from './imp/genericImp';
import TypecompatibilityImp from './imp/typecompatibilityImp';
import AdvancedTypeImp from './imp/advancedTypeImp';
import ModuleImp from './imp/moduleImp';
import TypeVSinterface from './imp/typeVSinterface';
function App() {
  return (
    <HashRouter>
      <div className="main">
        <div className="tab">
          <NavLink to="/interfaceImp" activeClassName="selected">
            <div className="tabItem">
              <span>interfaceImp</span>
            </div>
          </NavLink>
          <NavLink to="/lyric" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>lyric</span>
            </div>
          </NavLink>
          <NavLink to="/classImp" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>ClassImp</span>
            </div>
          </NavLink>
          <NavLink to="/funcImp" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>funcImp</span>
            </div>
          </NavLink>
          <NavLink to="/genericImp" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>genericImp</span>
            </div>
          </NavLink>
          <NavLink to="/typecompatibilityImp" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>typecompatibilityImp</span>
            </div>
          </NavLink>
          <NavLink to="/advancedTypeImp" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>advancedTypeImp</span>
            </div>
          </NavLink>
          <NavLink to="/moduleImp" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>moduleImp</span>
            </div>
          </NavLink>
          <NavLink to="/typeVSinterface" activeClassName="selected">
            {' '}
            <div className="tabItem">
              <span>typeVSinterface</span>
            </div>
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route path="/interfaceImp" exact component={InterfaceImp} />

            <Route path="/lyric" exact component={Lyric} />
            <Route path="/classImp" exact component={ClassImp} />

            <Route path="/funcImp" exact component={FuncImp} />
            <Route path="/genericImp" exact component={GenericImp} />
            <Route path="/typecompatibilityImp" exact component={TypecompatibilityImp} />
            <Route path="/advancedTypeImp" exact component={AdvancedTypeImp} />

            <Route path="/moduleImp" exact component={ModuleImp} />

            <Route path="/typeVSinterface" exact component={TypeVSinterface} />
            <Redirect to="/interfaceImp"></Redirect>
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
