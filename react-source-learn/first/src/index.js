import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';


function Counter(){
  const[count,setCount]=useState(0)
  return (
   
    <div className="App">
      {/* <Counter {...counterProps}></Counter>
      <SideEffect></SideEffect> */}
      {/* <Arr></Arr> */}
      <p onClick={e=>{setCount(count+1)}}>{count}</p>
    </div>
  );
 
}
function List(){
 const len = 3000;
  return (
    <ul>
      {Array(len).fill(0).map((_, i) => <li key={i}>{i}</li>)}
    </ul>
  );
}

ReactDOM.render( <Counter/>,  document.getElementById('root'));
ReactDOM.render( <List/>,  document.getElementById('root1'));
//ReactDOM.unstable_createRoot( document.getElementById('root')).render(<Counter/>)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
