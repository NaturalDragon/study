import React, { useState, useEffect } from "react";
import { Router, Link, Route, Switch, Redirect } from "dva/router";
//import Reimbursement from "./Reimbursement/List";
import styles from "./reimbursementList.less";
import Loadable from 'react-loadable'
const Loading=()=><div></div>

const Reimbursement= Loadable({
  loader: ()=> import('./Reimbursement/List'),
  loading:Loading
})

const tabs = [
  {
    title: "列表",
    id: 0,
    select: false,
    path: "/app/list/0",
  },

];
function IndexTab({ match, history }) {
  let status = history.location.pathname.substr(
    history.location.pathname.length - 1
  );
  const [currentIndex, setCurrentIndex] = useState(Number(status));

  return (
    <div className={styles.remimbursement}>
      <div className={styles.opt}>
        <div className={styles.tab}>
          {tabs.map((ele) => (
            <div
              key={ele.id}
              onClick={(e) => {
                setCurrentIndex(ele.id);
                history.replace(ele.path);
              }}
              className={`${styles.tabItem} ${
                ele.id === currentIndex ? styles.select : ""
              }`}
            >
              {/* <Link replace={ele.path}>
                                {ele.title}</Link> */}
              {ele.title}
            </div>
          ))}
        </div>
      </div>
      <Switch>
        <Route path={`${match.path}/list/:status`} component={Reimbursement} />
        {/* <Route path={`${match.path}/list/1`} component={Reimbursement} />
                <Route path={`${match.path}/list/2`} component={Reimbursement} /> */}
        <Redirect to={`${match.url}`} />
      </Switch>
    </div>
  );
}
export default IndexTab;
