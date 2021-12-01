import {useState,useLayoutEffect}from 'react'
import './App.css';

function App() {
  const [num,setNum]=useState(0);
  // useLayoutEffect(()=>{
  //   if(num===2){
  //     setNum(num+'woshi2')
  //   }
  // },[num])

  const a=(// 更新前
    <div key='a1'>
      <p key="ka">ka</p>
      <h3 key="song">song</h3>
    </div>
    )
    const b=(// 更新后
      <div key='b2'>
        <h3 key="song">song</h3>
        <p key="ka">ka</p>
      </div>)
  return (
    <div className="App" onClick={e=>{setNum(num+1)}}>
        {num%2?a:b}
    </div>
  );
}

export default App;
