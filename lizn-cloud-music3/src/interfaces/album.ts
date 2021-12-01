/** @format */

import { Record } from "immutable";
import { ISongData } from "./song";
import { RouteComponentProps } from "react-router";
import { match } from "react-router-dom";

export interface AlbumState {
  currentAlbum: IAlbumData;
  enterLoading: boolean;
}
export interface IAblumProps extends RouteComponentProps {
  currentAlbum: Record<IAlbumData>;
  enterLoading: boolean;
  getAlbumDataDispatch: Function;
  match: match<IAlbumParam>;
}

export interface IAlbumParam {
  id: string;
}
export interface IAlbumData {
  subscribedCount: number;
  coverImgUrl: string;
  name: string;
  creator: IAlbumCreator;
  tracks: Array<ISongData>;
}

export interface IAlbumCreator {
  avatarUrl: string;
  nickname: string;
}
