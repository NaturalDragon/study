/** @format */

export interface ISongProps {
  collectCount: number;
  showCollect: boolean;
  songs: Array<ISongData>;
  //   changePlayListDispatch: Function;
  //   changeCurrentIndexDispatch: Function;
  //   changeSequecePlayListDispatch: Function;
  musicAnimation: Function;
}

export interface ISongData {
  id: string;
  name?: string;
  ar?: Array<ISongAR>;
  al?: ISongAl;
  dt?: number;
}

export interface ISongAR {
  id: number;
  name: string;
}
export interface ISongAl {
  name: string;
  picUrl: string;
}

export default class Song {}
