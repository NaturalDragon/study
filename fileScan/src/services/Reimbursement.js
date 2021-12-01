import request from '../utils/request';
import Request from "./axiosRequest";
// 获取职责部门
export function GetUserDutyList(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/GetUserDutyList`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}



export function GetOrgProject(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/GetOrgProject`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

// 获取职责部门
export function GetUserInfo(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/GetUserInfo`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}


// 获取人员账户信息
export function GetUserAccountList(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/GetUserAccountList`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

// 获取表单类型
export function GetUserDutyFormTemplate(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/GetUserDutyFormTemplate`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

// 获取预算科目
export function GetTripBudget(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/GetTripBudget`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}
// 报销
export function ReimbursementSave(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/ReimbursementSave`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}
//修改报销单--撤销并新增一个报销单
export function ReimbursementModifyAndRevoke(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/ReimbursementModifyAndRevoke`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}
//撤销
export function ReimbursementRevoke(params) {
  return Request(`${window.AppSetting.openApiIp}/api/SmartReimbursement/ReimbursementRevoke`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

export function GetInvoicePackage(params) {
  return Request(`${window.AppSetting.invoiceAssistantIp}/api/InvoicePackage/GetInvoicePackage`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}
export function GetInvoiceByPackageIds(params) {
  return Request(`${window.AppSetting.invoiceAssistantIp}/api/InvoicePackage/GetBillHolderByPackageIds`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

export function GetAnnexStorageByPackageIds(params) {
  return Request(`${window.AppSetting.invoiceAssistantIp}/api/InvoicePackage/GetAnnexStorageByPackageIds`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}


export function GetForModify(params) {
  return Request(`${window.AppSetting.invoiceAssistantIp}/api/InvoiceReimbursement/GetForModify`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}


export function InvoiceReimbursementRemove(params) {
  return Request(`${window.AppSetting.invoiceAssistantIp}/api/InvoiceReimbursement/Remove`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

export function InvoiceReimbursemenGetListPaged(params) {
  return Request(`${window.AppSetting.serverIp}/api/file/GetPaged`, {
    method: "post",
    mode: 'cors',
    traditional: true,
    data: JSON.stringify(params),
  });
}

