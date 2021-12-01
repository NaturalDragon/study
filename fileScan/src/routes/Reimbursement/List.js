import { connect } from "dva";
import { useMemo, useCallback, useEffect, Fragment } from "react";
import { Tabs, WhiteSpace } from "antd-mobile";
import _ from "underscore";
import RefreshList from "../../components/Mobile/Reimbursement/components/RefreshList";
import com from "../../utils/common";
import "./List.less";
import { Number } from "core-js";
const tabs = [
  // { title: "暂存", value: 99, Component: RefreshList },
  { title: "报销中", value: 0 },
  { title: "已报销", value: 1 },
  { title: "已撤销", value: 2 },
  // { title: '暂停', value: 4 },
  // { title: '挂起', value: 8 },
];

function Index(props) {
  let { history, invoiceReimbursement, match, dispatch } = props;
  const status = match.params.status;
  const { refresh, tabList, tabInfo } = invoiceReimbursement;
  const {
    getListPaged,
    getListPagedMore,
    getListPagedSuccess,
    changeTabInfo,
    changeCurrentStatus,
    removeItem,
    reimbursementRevoke,
  } = props;
  const { invoiceReimbursementList, pagination } = tabList[status];
  const { pullUpLoading, pullDownLoading, scrollY, title } = tabInfo[status];
  useEffect(() => {
    changeCurrentStatus(status);
  }, [status]);
  useEffect(() => {
    if (invoiceReimbursementList.length > 0) return;
    getListPaged({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      status: status,
      title,
    });
  }, []);
  const onSerachFetch = useMemo(() => {
    return _.debounce((title) => {
      getListPaged({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        status: status,
        title: title,
      });
    }, 500);
  }, []);
  const onSerachChange = (key) => {
    tabInfo[status].title = key;
    changeTabInfo(tabInfo);
    onSerachFetch(key);
  };
  const changeScrollY = useMemo(() => {
    return _.debounce((y) => {
      console.log(status);
      tabInfo[status].scrollY = y;
      changeTabInfo(tabInfo);
    }, 500);
  }, [changeTabInfo, status]);

  const pullDown = () => {
    tabList[status].pagination.pageIndex = 1;
    //getListPagedSuccess(tabList)
    getListPaged({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      status: status,
      title,
    });
  };
  const pullUp = () => {
    let currentPagination = tabList[status].pagination;
    if (
      currentPagination.pageIndex * currentPagination.pageSize >=
      currentPagination.totalCount
    )
      return;

    tabList[status].pagination.pageIndex = currentPagination.pageIndex + 1;
    getListPagedMore({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      status: status,
      title,
    });
  };
  const goDetail = (id) => {
    history.push({
      pathname: `/app/detail`,
      search: `id=${id}`,
    });
  };


  // return <IndexComp {...IndexProps}></IndexComp>;
  return (
    <Fragment>
      <RefreshList
        pullDownLoading={pullDownLoading}
        pullUpLoading={pullUpLoading}
        pullDown={pullDown}
        pullUp={pullUp}
        status={Number(status)}
        scrollY={scrollY}
        changeScrollY={changeScrollY}
        invoiceReimbursementList={invoiceReimbursementList}
        goDetail={goDetail}
        removeItem={removeItem}
        reimbursementRevoke={reimbursementRevoke}
        title={title}
        onSerachChange={onSerachChange}
      ></RefreshList>
      {/* <Tabs
      animated={false}
      onTabClick={(tab, index) => { onTabChange(index) }}
      page={currentStatus}
      tabs={tabs}
      renderTabBar={(props) => <Tabs.DefaultTabBar {...props} page={3} />}
    >
      {renderContent}

    </Tabs> */}
    </Fragment>
  );
}

function mapStateToProp({ invoiceReimbursement }) {
  return { invoiceReimbursement };
}
function mapDispatchToProp(dispatch) {
  return {
    getListPaged(params) {
      dispatch({
        type: "invoiceReimbursement/getListPaged",
        payload: params,
      });
    },
    getListPagedMore(params) {
      dispatch({
        type: "invoiceReimbursement/getListPagedMore",
        payload: params,
      });
    },
    getListPagedSuccess(tabList) {
      dispatch({
        type: "invoiceReimbursement/getListPagedSuccess",
        payload: { tabList: tabList },
      });
    },
    changeTabInfo(tabInfo) {
      dispatch({
        type: "invoiceReimbursement/changeTabInfo",
        payload: { tabInfo: tabInfo },
      });
    },
    changeCurrentStatus(status) {
      dispatch({
        type: "invoiceReimbursement/changeCurrentStatus",
        payload: status,
      });
    },
    removeItem(id) {
      dispatch({
        type: "invoiceReimbursement/removeItem",
        payload: id,
      });
    },
    reimbursementRevoke(billNumber, id) {
      dispatch({
        type: "invoiceReimbursement/reimbursementRevoke",
        payload: { billNumber, id },
      });
    },
  };
}
export default connect(mapStateToProp, mapDispatchToProp)(Index);
