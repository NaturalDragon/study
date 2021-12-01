import { RouteComponentProps } from "react-router";
import { match } from "react-router-dom";
import { Record } from "immutable";
import { ISongData } from "./song";

export interface SingerInfoState {
  artistInfo: IArtistInfo;
  enterLoading: boolean;
}
export interface ISingerInfoProps extends RouteComponentProps {
  match: match<ISingerParam>;
  enterLoading: boolean;
  getArtistInfoDispatch: Function;
  artistInfo: Record<IArtistInfo>;
}
export interface ISingerParam {
  id: string;
}
export interface IArtistInfo {
  artist: IArtist;
  hotSongs: Array<ISongData>;
}
export interface IArtist {
  picUrl: string;
  name: string;
}
