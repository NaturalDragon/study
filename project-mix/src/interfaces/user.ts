import {BaseInterface} from './base'
export interface UserInterface{
    id:string,
    name:string,
    age:number
}

export interface UserComInterface extends BaseInterface{
    list:Array<UserInterface>
}
export interface LoginResultInterface extends BaseInterface{
    loginStatu:boolean,
    loginMessage:string
}

export interface BGInterface extends BaseInterface{
    
}

export interface ChannelInterface extends BaseInterface{
    
}

export interface SearchInterface extends BaseInterface{
    
}