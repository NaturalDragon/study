/* eslint-disable eqeqeq */
/* eslint-disable no-loop-func */
import config from "./config";
import { platformConfig } from "./Constants";
import _ from "underscore";
import moment from "moment";

function SetCookie(name, value) {
  document.cookie = name + "=" + escape(value) + ";path=/";
}
function GetCookie(objName) {
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] == objName) return unescape(temp[1]);
  }
  return "";
}
function Guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
var GetQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var param = window.location.href.split("?")[1];
  if (!param) return null;
  var r = param.match(reg);
  if (r != null) return r[2];
  return null;
};
var GetQueryUrlString = function (url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var param = url.split("?")[1];
  if (!param) return null;
  var r = param.match(reg);
  if (r != null) return r[2];
  return null;
};
function SetPkey(data) {
  SetCookie(config.pkey, data);
}

function GetPkey() {
  return GetCookie(config.pkey);
}
function GetLastDay(value) {
  var date = new Date(value),
    y = date.getFullYear(),
    m = date.getMonth();
  //var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0).toLocaleDateString();
  return lastDay;
}
function GetFirstDay(value) {
  var date = new Date(value),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(y, m, 1).toLocaleDateString();
  // var lastDay = new Date(y, m + 1, 0);
  return firstDay;
}
function GetDateGroup(arr = [], type) {
  // type 发票类型
  var new_arr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    let [Month_index, invoiceDate] = ["", ""];
    if (type === "2") {
      Month_index = arr[i].invoiceDateTime.lastIndexOf("-");
      invoiceDate = arr[i].invoiceDateTime.substr(0, Month_index);
    } else if (type === "3") {
      Month_index = arr[i].receiptDate.lastIndexOf("-");
      invoiceDate = arr[i].receiptDate.substr(0, Month_index);
    } else {
      Month_index = arr[i].invoiceDate.lastIndexOf("-");
      invoiceDate = arr[i].invoiceDate.substr(0, Month_index);
    }
    var exits = _.where(new_arr, { date: invoiceDate });
    if (exits.length <= 0) {
      new_arr.push({ date: invoiceDate, list: [] });
    }
    new_arr.forEach((item) => {
      if (item.date === invoiceDate) {
        item.list.push(arr[i]);
      } else {
        // new_arr.push({date:invoiceDate,list:[]})
      }
    });
    //   if(exits&&exits.length>0){

    //   }

    // if (!new_arr[invoiceDate]) {

    //     new_arr[invoiceDate] = [];
    //     new_arr[invoiceDate].push(arr[i])
    // } else {
    //     new_arr[invoiceDate].push(arr[i])
    // }
  }

  var list = new_arr.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return list;
}

function getKeyFromValue(value, obj) {
  for (const name in obj) {
    if (obj[name] === value) return name;
  }
  return null;
}

function getKeyFromArrayValue(value, obj) {
  for (const name in obj) {
    if (obj[name].includes(value)) return name;
  }
  return null;
}

function getValueFromKey(value, obj) {
  for (const name in obj) {
    if (name === value) return obj[name];
  }
  return null;
}

function getAmountFormat(params) {
  return (Number(params).toFixed(2) + "").replace(
    /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
    "$1, "
  );
}

//格式化数字金额
function format(x) {
  if (x != ".") {
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf(".");
    if (rs <= 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + 2) {
      s += "0";
    }
    return s;
  } else {
    return "0.00";
  }
}
/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
function deepCopy(obj, cache = []) {
  // typeof [] => 'object'
  // typeof {} => 'object'
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const hit = cache.filter((c) => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy,
  });
  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

function dateMeth(dateString) {
  let [startDateTime, endDateTime] = [];
  if (dateString && dateString[0]) {
    const dateValue = `${dateString[0]}/${dateString[1]}/01`;
    endDateTime = GetLastDay(dateValue);
    startDateTime = GetFirstDay(dateValue);
  }
  return { startDateTime, endDateTime };
}

function newDateMeth(dateString = []) {
  let [startDateTime, endDateTime, tempTime] = [];
  switch (dateString[0]) {
    case "all":
      break;
    case "week":
      endDateTime = moment(new Date()).format("YYYY-MM-DD");
      tempTime = moment().subtract(7, "days");
      startDateTime = moment(tempTime).format("YYYY-MM-DD");
      break;
    case "month":
      endDateTime = moment(new Date()).format("YYYY-MM-DD");
      tempTime = moment().subtract(30, "days");
      startDateTime = moment(tempTime).format("YYYY-MM-DD");
      break;
    case "threeMonth":
      endDateTime = moment(new Date()).format("YYYY-MM-DD");
      tempTime = moment().subtract(90, "days");
      startDateTime = moment(tempTime).format("YYYY-MM-DD");
      break;

    default:
      const dateValue = `${dateString[0]}/${dateString[1]}/01`;
      endDateTime = moment(GetLastDay(dateValue)).format("YYYY-MM-DD");
      startDateTime = moment(GetFirstDay(dateValue)).format("YYYY-MM-DD");
      break;
  }
  return { startDateTime, endDateTime };
}

function statusMeth(ticketStatusObj) {
  let status = "";
  if (ticketStatusObj.value && ticketStatusObj.value[0]) {
    status = ticketStatusObj.value[0];
  }
  return status;
}

function typeMeth(ticketTypeObj) {
  let type = "";
  if (ticketTypeObj.value && ticketTypeObj.value[0]) {
    type = ticketTypeObj.value[0];
  }
  return type;
}
function GetOrgInfo(data, duty) {
  let parentOrg = _.where(data, { id: duty.orgID })[0];
  if (
    parentOrg &&
    parentOrg.icon === "/content/imgs/icos/orgtreeico/70bm.png"
  ) {
    parentOrg = _.where(data, { id: parentOrg.parentID })[0];
  }
  return parentOrg;
}
function GetDeptInfo(data, duty) {
  let parentOrg = _.where(data, { id: duty.orgID })[0];

  return parentOrg;
}
function ToThousand(num) {
  //1.先去除空格,判断是否空值和非数
  num = parseFloat(num).toFixed(2);
  +"";
  num = num.replace(/[ ]/g, ""); //去除空格
  if (num == "") {
    return;
  }
  if (isNaN(num)) {
    return;
  }
  //2.针对是否有小数点，分情况处理
  var index = num.indexOf(".");
  if (index == -1) {
    //无小数点
    var reg = /(-?\d+)(\d{3})/;
    while (reg.test(num)) {
      num = num.replace(reg, "$1,$2");
    }
  } else {
    var intPart = num.substring(0, index);
    var pointPart = num.substring(index + 1, num.length);
    var reg = /(-?\d+)(\d{3})/;
    while (reg.test(intPart)) {
      intPart = intPart.replace(reg, "$1,$2");
    }
    num = intPart + "." + pointPart;
  }
  return num; //.toFixed(2);
}
const themeColor = "#4C98FF";

const getPreReimbursementRoutePath = () => {
  let route = "";
  if (window.AppSetting.platform === platformConfig.CRMG) {
    route = "npfPreReimbursement";
  } else if (window.AppSetting.platform === platformConfig.FinanceShare) {

    route ='preReimbursement'
  }
  return route;
};


const getReimbursementRoutePath = () => {
  let route = "";
  if (window.AppSetting.platform === platformConfig.CRMG) {
    route = "npfPreReimbursement";
  } else if (window.AppSetting.platform === platformConfig.FinanceShare) {

    route =window.AppSetting.isShare?"shareReimbursement": "reimbursement";
  }
  return route;
};

const beNumber = (params) => {
  let tempParams = params
    .replace(/[^\d^\.]+/g, "")
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  return tempParams;
};


/**
 *
 * @param {array} arr 票夹列表数据
 * @param {string} type 发票类型
 * @param {string} sortType 排序方式
 */
function GetDateGroupTop(arr = [], type, sortType) {
  var new_arr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    let [Month_index, tempDate] = ["", ""];
    switch (sortType) {
      case "21":
        Month_index = arr[i].createTime.lastIndexOf("-");
        tempDate = arr[i].createTime.substr(0, Month_index);
        break;

      case "22":
        Month_index = arr[i].invoiceDate.lastIndexOf("-");
        tempDate = arr[i].invoiceDate.substr(0, Month_index);
        break;

      default:
        break;
    }
    var exits = _.where(new_arr, { date: tempDate });
    if (exits.length <= 0) {
      new_arr.push({ date: tempDate, list: [] });
    }
    new_arr.forEach((item) => {
      if (item.date === tempDate) {
        item.list.push(arr[i]);
      } else {
        // new_arr.push({date:tempDate,list:[]})
      }
    });
  }

 
  var list = new_arr.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return list;
}

function getDate(date){
  if(!date) return date
  return String.prototype.substr.call(date,0,10);
}

const defaultTaxRate = (date, invoiceType) => {
  var tryConvert=Number(invoiceType);
  invoiceType=_.isNaN(tryConvert)?invoiceType:tryConvert;
  let rate = 0;
  let time = 0;
  if (date instanceof Date) {
    time = +date;
  } else {
    time = new Date(date.replace(/-/g, "/")).getTime()
  }
  if (time >= new Date("2019-04-01").getTime()) {
    //火车票、飞机票
    if (invoiceType === 15 || invoiceType === 16
      |invoiceType === 'train' || invoiceType === 'airplane') {
      rate = 0.09;
    }
    //轮船票、汽车票
    if (invoiceType === 19 || invoiceType === 18
      |invoiceType === 'car' || invoiceType === 'ferry') {
      rate = 0.03;
    }
  }
  return rate
}
export default {
  GetQueryString: GetQueryString,
  GetQueryUrlString: GetQueryUrlString,
  SetPkey: SetPkey,
  GetPkey: GetPkey,
  SetCookie: SetCookie,
  GetCookie: GetCookie,
  GetDateGroup,
  GetLastDay,
  GetFirstDay,
  getKeyFromValue,
  getKeyFromArrayValue,
  getValueFromKey,
  Guid,
  getAmountFormat,
  format,
  deepCopy,
  dateMeth,
  statusMeth,
  typeMeth,
  themeColor,
  GetOrgInfo,
  GetDeptInfo,
  ToThousand,
  newDateMeth,
  getReimbursementRoutePath,
  getPreReimbursementRoutePath,
  beNumber,
  defaultTaxRate,
  GetDateGroupTop,
  getDate,
};
