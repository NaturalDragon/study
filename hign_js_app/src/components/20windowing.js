import React from 'react'
import { FixedSizeList as List } from 'react-window';
import Logo from '../assets/testsvg.svg'
const Row = (props) => {
    
    const { data,index, style }=props;
    const ele=data[index];
    console.log(ele);
    return (<div style={style}>{ele.name} {index}<img height='10' width='10' src={Logo}></img></div>)
}
const data=[]
const dataAdd=()=>{
    debugger
    for (let index = 0; index < 100; index++) {
        data.push({name:`item${index}`,age:index})
        
    }
}
dataAdd();
const Example = (props) =>{
    debugger
    return  ( <List
        itemData={data}
        height={window.innerHeight}
        itemCount={data.length}
        itemSize={55}
        width={window.innerWidth}
    >
        {Row}
    </List>)
    
};

export default Example;