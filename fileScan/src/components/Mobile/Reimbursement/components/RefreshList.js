import react, { useRef, useEffect } from "react";
import {
  Toast,
  Modal,
  SwipeAction,
  SearchBar,
  PullToRefresh,
  ListView,
  Icon,
  NavBar,
} from "antd-mobile";
import _ from "underscore";
import { routerRedux } from "dva/router";
import request from "../../../../utils/request";
import com from "../../../../utils/common";
import Scroll from "../../../../baseUI/scroll";
import styles from "./RefreshList.less";
import {
  InvoiceReimbursementRemove,
  ReimbursementRevoke,
} from "../../../../services/Reimbursement";
const pageSize = 12;
const Row = (props) => {
  const { rowData, goDetail, status } = props;
  const { revokeItem, modifyAndRvokeItem, removeItem } = props;
  const Element = () => (
    <div
      className={styles.reItem}
      onClick={(e) => {
        goDetail(rowData);
      }}
    >
     {rowData}
    </div>
  );
    return <Element />;
  
};

function RefreshList(props) {
  const {
    invoiceReimbursementList,
    status,
    pullUpLoading,
    pullDownLoading,
    currentStatus,
    scrollY,
    title,
  } = props;
  const {
    onSerachChange,
    goDetail,
    modifyAndRvokeItem,
    pullUp,
    pullDown,
    changeScrollY,
    removeItem,
    reimbursementRevoke,
  } = props;
  const scrollRef = useRef();
  useEffect(() => {
    if (!scrollRef.current) return;

    if (scrollY !== 0) {
      setTimeout(() => {
        const bScroll = scrollRef.current.getBScroll();
        bScroll.scrollTo(0, scrollY, 10);
      });
    }
  }, [status]);

  

  return (
    <>
      <div className={styles.searchRereshList}>
        <SearchBar
          onChange={(e) => {
            onSerachChange(e);
          }}
          value={title}
          cancelText="取消"
          placeholder="请输入关键字"
          maxLength={20}
        />
      </div>
      <Scroll
        ref={scrollRef}
        onScroll={(e) => {
          changeScrollY(e.y);
        }}
        height={window.innerHeight - 43 - 45}
        pullUpLoading={pullUpLoading}
        pullDownLoading={pullDownLoading}
        pullUp={pullUp}
        pullDown={pullDown}
      >
        <div>
          {invoiceReimbursementList &&
            invoiceReimbursementList.map((rowData) => (
              <Row
                key={rowData}
                rowData={rowData}
                goDetail={goDetail}
               
                status={status}
              ></Row>
            ))}
          {!pullDownLoading&&invoiceReimbursementList.length <= 0 && (
            <div className={`${styles.reItem} ${styles.noresult}`}>
              没有数据
            </div>
          )}
        </div>
      </Scroll>
    </>
  );
}
export default RefreshList;
