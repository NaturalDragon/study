import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import Counter from './components/counter';
import SideEffect from './components/sideEffect'
import FecthData from './components/fecthdata'
import HighEffect from './components/highEffect'
import Error from './components/05error'

import Arr from './components/06arr'
import './App.css';

function App() {
  const counterProps={
    friend:{id:12}
  }
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

export default App;
