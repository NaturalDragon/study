import React from 'react'


class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }
   
    static getDerivedStateFromError(error){
        return {
            hasError:true
        }
    }

    componentDidCatch(error,info){

    }
   render(){
       if(this.state.hasError){
            // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
   }

}
class MyWidget extends React.Component{
  
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.handleClick = this.handleClick.bind(this);
      }
      
      handleClick() {
        this.setState(({counter}) => ({
          counter: counter + 1
        }));
      }
      
      render() {
        if (this.state.counter === 5) {
          // Simulate a JS error
          throw new Error('I crashed!');
        }
        return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
      }
} 
export default class Ex  extends React.Component{ 

    render(){
         return(
            <ErrorBoundary>
            <MyWidget />
          </ErrorBoundary>
         )   
    }
}