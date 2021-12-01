import React from 'react';


export default class Index extends React.Component{
    state={
        count:0
    }

    componentDidMount(){
        this.test()
    }

    // async componentDidMount(){
    //   await  this.test()
    // }

    test=()=>{
        this.setState({
            count:this.state.count+1
        })
        console.log(this.state.count)
        this.setState({
            count:this.state.count+13
        })
        console.log(this.state.count)
    }

    test2=()=>{
            setTimeout(()=>{
                this.setState({
                    count:this.state.count+1
                })
                console.log(this.state.count)
                this.setState({
                    count:this.state.count+1
                })
                console.log(this.state.count)
            })
    }
    test3=()=>{
        Promise.resolve().then(()=>{
            this.setState({
                count:this.state.count+1
            })
            console.log(this.state.count)
            this.setState({
                count:this.state.count+1
            })
            console.log(this.state.count)
        })
    }

    test4=()=>{
        this.setState(prevState=>{
            console.log(prevState.count)
            return {
                count:prevState.count+1
            }
        })
        this.setState(prevState => {
            console.log(prevState.count); // 1
            return {
                count: prevState.count + 1
            };
        });
    }
    async test5() {
        await 0;
        this.setState({
            count: this.state.count + 1
        });
        console.log(this.state.count); // 此时为1
        this.setState({
            count: this.state.count + 1
        });
        console.log(this.state.count); // 此时为2
    }

    render(){
        return  (
        <div>111</div>)
    }
}