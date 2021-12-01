import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { AxiosPromise } from "axios";
import { call, all, takeEvery, put, debounce } from "redux-saga/effects";

import { getLogInfoListRequest } from "../service/logInfo";
import { RootState } from "../app/store";
export interface IPagination {
  pageIndex: number;
  pageSize: number;
  rowCount?: number;
  total?: number;
  totalCount?: number;
}
export interface ILogInfo {
  properties: IPoperties;
}
export interface IPoperties {
  longDate: string;
  url: string;
  message: string;
  action: string;
}

export interface LogInfoState {
  logList: Array<ILogInfo>;
  pagination: IPagination;
  enterLoading: boolean;
}
const initialState: LogInfoState = {
  logList: new Array<ILogInfo>(),
  pagination: {
    pageIndex: 1,
    pageSize: 15,
  },
  enterLoading: false,
};

export const LogInfoSlice = createSlice({
  name: "logInfo",
  initialState,
  reducers: {
    changeEnterLoading: (state, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload;
    },
    changePagination: (state, action: PayloadAction<IPagination>) => {
      state.pagination = action.payload;
    },
    getList: (state, action) => {
      state = action.payload;
    },
    getListSuccess: (state, action: PayloadAction<Array<ILogInfo>>) => {
      state.logList = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  changeEnterLoading,
  changePagination,
  getList,
  getListSuccess,
} = LogInfoSlice.actions;

export function* saga(store: Store) {
  const dispatch = store.dispatch;
  yield takeEvery(getList, getLogInfoList);
}
function* getLogInfoList(action: PayloadAction<IPagination>) {
  yield put(changeEnterLoading(true));
  const result = yield call(getLogInfoListRequest, { ...action.payload });

  if (result) {
    yield put(changeEnterLoading(false));
    const { data, ...page } = result.data;
    yield put(changePagination(page));
    yield put(getListSuccess(data));
  }
}
export const logInfoState = (state: RootState) => state.logInfo;
export default LogInfoSlice.reducer;
