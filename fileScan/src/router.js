import React, { useRef } from "react";
import dynamic from "dva/dynamic";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Router, Route, Switch, Redirect } from "dva/router";
import { prefixStyle } from "./utils/prefixStyle";




import {
  registerAnimation,
  runAnimation,
  unregisterAnimation,
} from "create-keyframe-animation";
import AuthorizedRoute from './routes/AuthorizedRoute'
import ReimbursementListTab from "../src/routes/reimbursementList";
import Detail from "../src/routes/Reimbursement/detail";
import AutoLogin from "../src/routes/autoLogin";

import "./router.less";
const ANIMATION_MAP = {
  PUSH: "forward",
  POP: "back",
};
const transform = prefixStyle("transform");
const transition = prefixStyle("transition");
// const Reimbursement= Loadable({
//   loader: ()=> import('./Reimbursement/List'),
//   loading:Loading
// })
function RouterConfig({ history, app }) {

  const Reimbursement = dynamic({
    app,
    namespace: "Reimbursement",
    component: () => import("./routes/Reimbursement/List"),
  });
  const App = ({ match }) => {
    const routerRef = useRef();
    const enter = () => {
      if (!routerRef.current) return;
      // routerRef.current.style.display = "block";
      let animation = {
        0: {
          opacity: 0,
          transform: `translateX(100%)`,
        },
        100: {
          opacity: 1,
          transform: `translateX(0)`,
        },
      };
      registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 300,
          easing: "linear",
        },
      });
      runAnimation(routerRef.current, "move");
    };
    const afterEnter = () => {
      if (!routerRef.current) return;
      // 进入后解绑帧动画
      unregisterAnimation("move");
      routerRef.current.style.animation = "";
    };
    const leave = () => {
      console.log("leave");
      if (!routerRef.current) return;

      let animation = {
        0: {
          opacity: 1,
          transform: `translateX(0)`,
        },
        100: {
          opacity: 0,
          transform: ` translateX(-100%)`,
        },
      };
      registerAnimation({
        name: "leave",
        animation,
        presets: {
          duration: 300,
          easing: "linear",
        },
      });
      runAnimation(routerRef.current, "leave");
    };

    const afterLeave = () => {
      if (!routerRef.current) return;
      unregisterAnimation("leave");
      routerRef.current.style.animation = "";
    };

    return (
      <TransitionGroup
        className="router-wrapper"
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: ANIMATION_MAP[history.action],
          })
        }
      >
        <CSSTransition
          timeout={300}
          key={history.location.pathname}
          // onEnter={enter}
          // onEntered={afterEnter}
          // onExit={leave}
          // onExited={afterLeave}
        >
          <div>
            <Switch>
              {/* <Route path={`${match.path}/list/:status`} exact component={Reimbursement} /> */}
              <Route
                path={`${match.path}/detail`}
                component={Detail}
              />
              <Route
                path={`${match.path}`}
                component={ReimbursementListTab}
              />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  };
  return (
    <Router history={history}>
      <Switch>
        <AuthorizedRoute path="/" exact component={App} />
        <AuthorizedRoute path="/app" component={App} />
        <Route path='/auto' component={AutoLogin}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
