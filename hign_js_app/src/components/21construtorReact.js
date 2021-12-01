import React from 'react'


export default class Parent extends React.Component{
    
    // constructor(props){
    //    super(props)
    //    // console.log(this.props)
    // }
    componentDidMount(){
        console.log(this.props)
    }

    render(){
      return (  <div>parent</div>)
    }
}