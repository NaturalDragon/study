export const ticketOpt = {
  0: "专票",
  1: "普票",
  15: "airplane",
  16: "train",
  17: "taxi",
  18: "car",
  19: "ferry",
  20: "tolls",
  23: "roll",
  50: "其他发票",
};

export const invoiceCategoryOpt = {
  0: "未知",
  1: "进项",
  2: "销项",
};

export const entryMethodOpt = {
  0: "移动端录入",
  1: "PC",
};

export const trafficType = {
  train: "铁路车票",
  airplane: "航空运输电子客票行程单",
  taxi: "出租车票",
  car: "汽车票",
  ferry: "船票",
  tolls: "过路过桥费",
  roll: "增值税（卷票）",
};

export const trafficSelectOptions = [
  { label: "铁路车票", value: "train" },
  { label: "航空运输电子客票行程单", value: "airplane" },
  { label: "出租车票", value: "taxi" },
  { label: "汽车票", value: "car" },
  { label: "船票", value: "ferry" },
  { label: "过路过桥费", value: "tolls" },
];

export const trafficKeyValue = {
  0: "专用发票",
  1: "普通发票",
  15: "航空运输电子客票行程单",
  16: "铁路车票",
  17: "出租车票",
  18: "汽车票",
  19: "船票",
  20: "过路过桥费",
  21: "机打发票",
  22: "定额发票",
  23: "增值税（卷票）",
  99: "小票",
  50: "其他发票",
};

export const ImageTypes = [".png", ".jpeg", ".gif", ".bmp", ".jpg"];

export const imgSize = 1024 * 1024; // 超过1024kb 需要压缩

export const pullTicketList = {
  "": "InvoiceFolder",
  0: "InvoiceFolder",
  1: "InvoiceFolder",
  2: "TrafficTicket",
  3: "Receipt",
};

export const receiptTicketList = {
  1: "出租车票",
  2: "客运汽车票",
  3: "机打发票",
  4: "卷票",
  5: "定额发票",
  6: "过路费发票",
};

export const annexTypeConstant = {
  pdf: [".pdf"],
  photo: [
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tif",
    ".gif",
    ".svg",
    ".raw",
    ".webp",
  ],
  word: [".doc", ".docx"],
  excel: [".xls", ".xlsx"],
  ppt: [".ppt", ".pptx"],
};

export const platformConfig = {
  FinanceShare: "FinanceShare",
  CRMG: "CRMG",
  ISME: "ISME",
};

export const whiteRequest = ["/api/InvoiceAssistant/Get"];

export const SPECIAL_TICKET_OPTIONS = [
  { label: "专票", value: 0 },
  { label: "普票", value: 1 },
];
export const themeColor = "#4C98FF";
