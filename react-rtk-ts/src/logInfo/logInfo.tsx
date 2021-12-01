import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeEnterLoading,
  changePagination,
  getList,
  getListSuccess,
  logInfoState,
} from "./logInfoSlice";
const { useEffect, useState } = React;
function LogInfo() {
  const { logList, enterLoading, pagination } = useSelector(logInfoState);
  const dispatch = useDispatch();
  useEffect(() => {
    debugger;
    dispatch(
      getList({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      })
    );
  }, [pagination.pageIndex, pagination.pageSize]);
  const prev = () => {
    if (pagination.pageIndex === 1) return;
    dispatch(
      changePagination({
        pageIndex: pagination.pageIndex - 1,
        pageSize: pagination.pageSize,
      })
    );
  };
  const next = () => {
    dispatch(
      changePagination({
        pageIndex: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      })
    );
  };
  return (
    <>
      {enterLoading && <div>loading</div>}
      <div>
        <button onClick={prev}>上一页</button>
        <button onClick={next}>下一页</button>
      </div>
      <table>
        <tbody>
          {logList.map((log) => (
            <tr>
              <td>{log.properties.longDate}</td>
              <td>{log.properties.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LogInfo;
