import {BaseDispatch} from './base'
export interface UserInterface{
    id:string,
    name:string,
    age:number
}

export interface UserComInterface extends BaseDispatch{
    list:Array<UserInterface>
}
export interface LoginResultInterface extends BaseDispatch{
    loginStatu:boolean,
    loginMessage:string
}

export interface BGInterface extends BaseDispatch{
    
}

export interface ChannelInterface extends BaseDispatch{
    
}

export interface SearchInterface extends BaseDispatch{
    
}