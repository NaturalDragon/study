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

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Counter/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
