import React,{useState,useEffect,useRef} from 'react'


function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // 保存新回调
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    // 建立 interval
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function Counter() {
    let [count, setCount] = useState(0);
    let [delay,setDelay]=useState(1000)
    useInterval(() => {
      // 你自己的代码
      setCount(count + 1);
    }, delay);
  
    return <>
    <h1>{count}</h1>
    <input value={delay} onChange={e=>{setDelay(e.target.value)}}></input>
    </>;
  }

  export default Counter;