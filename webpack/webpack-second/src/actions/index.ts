
import {  UserInterface} from "../interfaces/user";
import { retry } from "redux-saga/effects";

export const GET_USERLIST = 'GET_USERLIST'
export const GET_USER_SUCESS="GET_USER_SUCCESS"
export const LOGIN_REQUEST='LOGIN_REQUEST';
export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const LOGIN_FAIL='LOGIN_FAIL'
export const LOGOUT='LOGOUT';
export const LOGINOUT_SUCCESS='LOGINOUT_SUCCESS'

export const START_BACKGROUD_TASK='START_BACKGROUD_TASK'
export const STOP_BACKGROUD_TASK='STOP_BACKGROUD_TASK'

export const TEST_CHANNEL='TEST_CHANNEL'

export const SEARCH='SEARCH'
export function getUserList(params:object):any{
   return {
    type:GET_USERLIST,
    params
   }
}

export function getUserSuccess(list:Array<UserInterface>):any{
      return {
         type:GET_USER_SUCESS,
         list
      }
}
 
export function  login(name:string,password:string) {
      return {
         type:LOGIN_REQUEST,
         name,
         password
      }
}
export function login_success(){
   return {
      type:LOGIN_SUCCESS
   }
}
export function login_fail(){
   return {
      type:LOGIN_FAIL
   }
}
export function login_out() {
   return {
      type:LOGOUT
   }
}
export function login_out_success() {
   return {
      type:LOGINOUT_SUCCESS
   }
}

export function start_background_task() {
   return {
      type:START_BACKGROUD_TASK
   }
}
export function stop_background_task() {
   return {
      type:STOP_BACKGROUD_TASK
   }
}
export function test_channel() {
   return {
      type:TEST_CHANNEL
   }
}
export function search(keywords:string) {
   return {
      type:SEARCH,
      keywords:keywords
   }
}
