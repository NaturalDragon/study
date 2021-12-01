// 只有”暂存“和”报销中“才能修改
export const tickeStateList = [
  { label: "全部", value: "" },
  { label: "未报销", value: "0" },
  { label: "报销中", value: "1" },
  { label: "已报销", value: "2" },
  { label: "暂存", value: "99" },
];
export const specialStateList = [
  { label: "全部", value: "2" },
  { label: "已认领", value: "1" },
  { label: "未认领", value: "0" },
];
export const ticketTypeList = [
  { label: "全部", value: "" },
  { label: "专用发票", value: "0" },
  { label: "普通发票", value: "1" },
  { label: "定额发票", value: "22" },
  { label: "增值税（卷票）", value: "23" },
  { label: "飞机票", value: "15" },
  { label: "火车票", value: "16" },
  { label: "出租车票", value: "17" },
  { label: "汽车票", value: "18" },
  { label: "船票", value: "19" },
  { label: "过路桥费", value: "20" },
  { label: "小票", value: "99" },
];

export const DateTimeList = [
  [
    { label: "全部日期", value: "" },
    { label: "2019年", value: "2019" },
    { label: "2018年", value: "2018" },
  ],
  [
    { label: "1月", value: "01" },
    { label: "2月", value: "02" },
    { label: "3月", value: "03" },
    { label: "4月", value: "04" },
    { label: "5月", value: "05" },
    { label: "6月", value: "06" },
    { label: "7月", value: "07" },
    { label: "8月", value: "08" },
    { label: "9月", value: "09" },
    { label: "10月", value: "10" },
    { label: "11月", value: "11" },
    { label: "12月", value: "12" },
  ],
];

export const MonthList = [
  { label: "1月", value: "01" },
  { label: "2月", value: "02" },
  { label: "3月", value: "03" },
  { label: "4月", value: "04" },
  { label: "5月", value: "05" },
  { label: "6月", value: "06" },
  { label: "7月", value: "07" },
  { label: "8月", value: "08" },
  { label: "9月", value: "09" },
  { label: "10月", value: "10" },
  { label: "11月", value: "11" },
  { label: "12月", value: "12" },
];

export const defaultYearList = [
  { label: "全部日期", value: "all" },
  { label: "一周内", value: "week" },
  { label: "一月内", value: "month" },
  { label: "三月内", value: "threeMonth" },
];

export function DateYearMonth() {
  var nowYear = new Date().getFullYear();
  var yearList = [{ label: "全部日期", value: "" }];
  var min = 2018;
  var len = nowYear - min;
  for (let i = 0; i <= len; i++) {
    yearList.push({ label: `${nowYear}年`, value: `${nowYear}` });
    nowYear--;
  }

  var yearMonth = [];
  yearMonth.push(yearList);
  yearMonth.push(MonthList);

  return yearMonth;
}

export function newDateYearMonth() {
  var nowYear = new Date().getFullYear();
  var yearLists = [...defaultYearList];
  var min = 2018;
  var len = nowYear - min;

  for (let i = 0; i <= len; i++) {
    yearLists.push({ label: `${nowYear}年`, value: `${nowYear}` });
    nowYear--;
  }

  var yearMonth = [];
  yearMonth.push(yearLists);
  yearMonth.push(MonthList);

  return yearMonth;
}

export const priceList = [
  { label: "全部", value: "" },
  { label: "0-1000", value: "0-1000" },
  { label: "1000-2000", value: "1000-2000" },
  { label: "2000-5000", value: "2000-5000" },
  { label: "5000-10000", value: "5000-10000" },
  { label: "10000以上", value: "10000-1000000000" },
  // { label: '5000-10000', value: '5000-10000' },
  // { label: '10000-20000', value: '10000-20000' },
  // { label: '20000-50000', value: '20000-50000' },
  // { label: '50000-100000', value: '50000-100000' },
  // { label: '100000-200000', value: '100000-200000' },
  // { label: '200000-500000', value: '200000-500000' },
  // { label: '500000-1000000', value: '500000-1000000' },
];
export const tickeTypeList = [
  { label: '全部', value: '' },
  { label: '专用发票', value: '0' },
  { label: '普通发票', value: '1' },
  { label: '定额发票', value: '22' },
  { label: '增值税（卷票）', value: '23' },
  { label: '飞机票', value: '15' },
  { label: '火车票', value: '16' },
  { label: '出租车票', value: '17' },
  { label: '汽车票', value: '18' },
  { label: '船票', value: '19' },
  { label: '过路桥费', value: '20' },
  // { label: '小票', value: '99' },
  { label: '其他发票', value: '50' },
]
export const titcketFolderStatusList = [
  { label: "未报销", value: "0" },
  { label: "已报销", value: "1" },
];
export const sortTypeList = [
  // { label: '开票日期正序', value: 12 },
  { label: '开票日期', value: '22' },
  // { label: '创建日期正序', value: 11 },
  { label: '上传日期', value: '21' },
]

export const usedList = [
  { label: "全部", value: "" },
  { label: "未使用", value: 0 },
  { label: "已使用", value: 1 },
];
export const pageSize = 12
// export default {
//   tickeStateList: ticketStateList,
//   tickeTypeList,
//   specialStateList,
//   ticketTypeList,
//   DateTimeList,
//   priceList,
//   DateYearMonth,
//   newDateYearMonth,
//   defaultYearList,
//   titcketFolderStatusList,
//   sortTypeList,
//   usedList,
//   pageSize: 12,
// };
