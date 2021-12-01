import {
  InvoiceReimbursementRemove,
  ReimbursementRevoke,
  InvoiceReimbursemenGetListPaged,
} from "../services/Reimbursement";
import com from "../utils/common";
import { Toast } from "antd-mobile";
const pageSize = 15;
const initalTabInfo = {
  scrollY: 0,
  title: "",
  pullUpLoading: false,
  pullDownLoading: false,
};
const initalTabList = {
  invoiceReimbursementList: [],
  pagination: { pageIndex: 1, pageSize },
};
export default {
  namespace: "invoiceReimbursement",

  state: {
    refresh: true,
    currentStatus: 0,

    tabInfo: {
      0: com.deepCopy(initalTabInfo),
      1: com.deepCopy(initalTabInfo),
      2: com.deepCopy(initalTabInfo),
    },
    tabList: {
      0: com.deepCopy(initalTabList),
      1: com.deepCopy(initalTabList),
      2: com.deepCopy(initalTabList),
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getListPaged({ payload }, { call, put, select }) {
      // eslint-disable-line
      const currentStatus = payload.status;
      const {
        invoiceReimbursement: { tabList, tabInfo },
      } = yield select();
      const currenttabInfo = tabInfo[currentStatus];
      currenttabInfo.pullDownLoading = true;
      yield put({
        type: "changeTabInfo",
        payload: { tabInfo: tabInfo },
      });
      const { data } = yield call(InvoiceReimbursemenGetListPaged, {
        ...payload,
      });
      if (data) {
        const currentTab = tabList[currentStatus];
        currentTab.invoiceReimbursementList = data.data;
        currentTab.pagination = data;
        currenttabInfo.pullDownLoading = false;
        yield put({
          type: "changeTabInfo",
          payload: { tabInfo: tabInfo },
        });
        yield put({
          type: "getListPagedSuccess",
          payload: {
            tabList: tabList,
          },
        });
      }
    },
    *getListPagedMore({ payload }, { call, put, select }) {
      const currentStatus = payload.status;
      const {
        invoiceReimbursement: { tabList, tabInfo },
      } = yield select();
      const currenttabInfo = tabInfo[currentStatus];
      currenttabInfo.pullUpLoading = true;
      yield put({
        type: "changeTabInfo",
        payload: { tabInfo: tabInfo },
      });
      const { data } = yield call(InvoiceReimbursemenGetListPaged, {
        ...payload,
      });
      if (data) {
        const currentTab = tabList[currentStatus];
        const currentPagination = currentTab.pagination;
        const currentinvoiceReimbursementList =
          currentTab.invoiceReimbursementList;
        currentTab.invoiceReimbursementList = currentinvoiceReimbursementList.concat(
          data.data
        );
        // currentTab.pagination = data;

        currenttabInfo.pullUpLoading = false;
        yield put({
          type: "changeTabInfo",
          payload: { tabInfo: tabInfo },
        });
        yield put({
          type: "getListPagedSuccess",
          payload: {
            tabList: tabList,
          },
        });
      }
    },
    *removeItem({ payload }, { call, put, select }) {
      const { data } = yield call(InvoiceReimbursementRemove, {
        entityId: payload,
      });
      if (data.isValid) {
        Toast.success("删除成功!");
        yield put({
          type: "removeItemSuccess",
          payload: {
            id: payload,
          },
        });
      } else {
        Toast.fail(data.errorMessages);
      }
    },
    *reimbursementRevoke({ payload }, { call, put, select }) {
      const { data } = yield call(ReimbursementRevoke, {
        billNumber: payload.billNumber,
        platform: window.AppSetting.platform,
      });
      if (data.isValid) {
        yield put({
          type: "removeItemSuccess",
          payload: {
            id: payload.id,
          },
        });
        Toast.success("撤销成功!");
      } else {
        Toast.fail(data.errorMessages);
      }
    },
  },

  reducers: {
    refresh(state, action) {
      const { refresh } = state;
      return { ...state, refresh: !refresh };
    },
    removeItemSuccess(state, action) {
      const { tabList, currentStatus } = state;
      const currentTab = tabList[currentStatus];
      const currentinvoiceReimbursementList =
        currentTab.invoiceReimbursementList;
      const newInvoiceReimbursementList = currentinvoiceReimbursementList.filter(
        (item) => {
          return item.id !== action.payload.id;
        }
      );
      currentTab.invoiceReimbursementList = newInvoiceReimbursementList;
      return { ...state, tabist: tabList };
    },
    changeCurrentStatus(state, action) {
      return { ...state, currentStatus: action.payload };
    },
    changeTabInfo(state, action) {
      return { ...state, tabInfo: action.payload.tabInfo };
    },
    getListPagedSuccess(state, action) {
      return { ...state, tabList: action.payload.tabList };
    },
  },
};
