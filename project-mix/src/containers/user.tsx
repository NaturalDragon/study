import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import UserCom from "../components/user";
import LoginCom from '../components/login';
import BGCom from '../components/bg';
import ChannelCom from '../components/channel'
import SearchCom from '../components/search'
function User(props:any): any {
   
    let {list,loginStatu,loginMessage,dispatch}=props
    const userProps:any={
        dispatch,
        list
    }
    return (<div>
        <UserCom  list={list} dispatch={dispatch}/>
        <div style={{border:'1px solid #ddd',width:'100%',marginBottom:20,marginTop:20}}></div>
        <LoginCom loginStatu={loginStatu} loginMessage={loginMessage} dispatch={dispatch}></LoginCom>
        <div style={{border:'1px solid #ddd',width:'100%',marginBottom:20,marginTop:20}}></div>
       <BGCom dispatch={dispatch}></BGCom>
       <div style={{border:'1px solid #ddd',width:'100%',marginBottom:20,marginTop:20}}></div>
       <ChannelCom dispatch={dispatch}></ChannelCom>
       <div style={{border:'1px solid #ddd',width:'100%',marginBottom:20,marginTop:20}}></div>
       <SearchCom dispatch={dispatch}></SearchCom>
    </div>)
}

const mapStateToProps = (userState:any) => {
    const {user}=userState
    return {
       ...user
    }
}

export default connect(mapStateToProps)(User)