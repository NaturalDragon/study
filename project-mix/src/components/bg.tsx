import React, { useEffect } from 'react';
import { BGInterface } from "../interfaces/user";
import {  start_background_task, stop_background_task } from '../actions/index'
export default class Login extends React.Component<BGInterface>{
    start = () => {
        const { dispatch } = this.props;
        dispatch(start_background_task())
    }
    end = () => {
        const { dispatch } = this.props;
        dispatch(stop_background_task())
    }
    render() {

        return (
            <div>


                <button onClick={this.start} >开始</button>



                <button onClick={this.end}> 结束</button>

            </div>
        )
    }
}