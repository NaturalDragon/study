import React from 'react';
import {towwayBdPPHoc} from '../hocs/HOCAPI'


class MyInput extends React.Component{
    render() {
        return <input {...this.props}></input>
      }
}

export default towwayBdPPHoc(MyInput)