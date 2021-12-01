import React, { useEffect } from 'react';
import { ChannelInterface } from "../interfaces/user";
import {  test_channel } from '../actions/index'
export default class Channel extends React.Component<ChannelInterface>{
    start = () => {
        const { dispatch } = this.props;
        dispatch(test_channel())
    }
   
    render() {

        return (
            <div>


                <button onClick={this.start} >channel</button>


            </div>
        )
    }
}