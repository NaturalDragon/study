
// import React from 'react';
// import ReactDOM from 'react-dom';

// import logo from './images/logo.png';
// import LargNumber from 'large-number-lizn'
// import './search.less';
const React = require('react');
const {testCom}= require('./commom/index')
const LargNumber = require('large-number-lizn');
const logo = require('./images/logo.png');
require('./search.less');

function a(){
    return 'aaaaa'
}
class Search extends React.Component {
    constructor(){
        super(...arguments)
        this.state={
            Text:null
        }
    }
    load=()=>{
        import('./testImport/index.js').then((text)=>{
            this.setState({
                Text:text.default
            })
        })
    }
    render() {
        let t=testCom();
        const num=1000//LargNumber.ad('999','1')
        let {Text}=this.state
        return <div className="search-text">
            {num}
            {
            Text?<Text/>:null
            }
           {t} 搜索文字的内容<img src={ logo } onClick={this.load} />
        </div>;
    }
}

module.exports=<Search></Search>;