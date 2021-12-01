import React, { useRef } from 'react'
import { findDOMNode } from 'react-dom'
class Children extends React.Component {
    constructor(props){
    super(props)
        this.state={
            count:0
        }
    }
    componentWillUnmount(){
        
    }

    change=()=>{
        this.setState((prevState,props)=>{
            debugger
            return ({
                count:prevState.count+2
            })
        })
        this.setState((prevState,props)=>{
            debugger
            return ({
                count:prevState.count+4
            })
        })
        
        // this.setState({
        //     count:this.state.count+2
        // })
        // this.setState({
        //     count:this.state.count+4
        // })
    }
    render() {

    return (<div onClick={this.change}>child
    
  
    {this.state.count}</div>)
    }
}
// function Children({name}){
//     console.log(name)
//     return (<div>
//         2
//     </div>)
// }
export default function Parent() {
    const refchild = useRef()

    return (<div onClick={(e) => {
        debugger
        let cDom=findDOMNode(refchild.current)
        let d = e.target === cDom
        console.log(d)
    }}>
        wobuxiaodeo 
        <Children ref={refchild} status={0}></Children>
    </div>)
}

