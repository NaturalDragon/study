// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from './k-react/react-dom-x'
import Component from './k-react/Component'
import './index.css';
import logo from './logo.svg';
import './App.css';



function FunctionComponent(props) {
  const [num, updateNum] = ReactDOM.useState(2);
  return <div className='boder'>
    <p>{props.name}--p1</p>
    <p onClick={e => {
      updateNum(c => c + 1)
    }}> p2-{num}</p>
  </div>
}
class ClassComponent extends Component {
  render() {
    return <div className='boder'>
      <p>aaa{this.props.name}---pl</p>
      <a>12s</a>
    </div>
  }
}
let JSX = (props)=>{
   const [num, updateNum] = ReactDOM.useState(1);
  return(<div className="App">
  <p  onClick={e => {
      updateNum(c => c + 1)
    }}>
    cy{num}
  </p>
  {/* <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >11</a> */}

  {/* <FunctionComponent name='function'></FunctionComponent> */}
  {/*  <ClassComponent name='class'></ClassComponent> */}
</div>)
}
ReactDOM.render(<JSX name='lizi'></JSX>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
