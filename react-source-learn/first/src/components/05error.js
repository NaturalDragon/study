import React ,{useState,useEffect, useRef}from 'react'

function Counter() {
    const [count, setCount] = useState(0);
    const lastCount=useRef(count) 
    useEffect(() => {
        lastCount.current=count
      setTimeout(() => {
        console.log(`You clicked ${lastCount.current} times ,state-count${count}`);
      }, 1000);
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }

  export default Counter;