import {RouteComponentProps}from 'react-router'
import {match}from 'react-router-dom'
import {Record}from 'immutable'
import {ISongData} from './song'
import * as action from '@/constants'
export interface ISingerInfoProps extends RouteComponentProps{
    match:match<ISingerParam>,
    enterLoading:boolean,
    getArtistInfoDispatch:Function,
    artistInfo:Record<IArtistInfo>
}

export interface ISingerParam{
    id:string
}
export interface IArtistInfo{
    artist:IArtist,
    hotSongs:Array<ISongData>
}
export interface IArtist{
    picUrl:string,
    name:string
}

export interface IChangeEnterLoadingAction{
    type:typeof action.CHANGE_SINGERINFO_ENTER_LOADING,
    data:boolean
}
export interface IGetArtistInfoSuccessAction{
  type:typeof action.CHANGE_SONGS_INFO_ARTIST_SUCCESS,
  data:IArtistInfo
}
export type ActionTypes=IChangeEnterLoadingAction
|IGetArtistInfoSuccessAction