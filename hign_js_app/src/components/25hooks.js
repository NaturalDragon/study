import React,{useEffect,useState,useRef} from 'react'
export default function Index(){
    
    const [count,setCount]=useState(0)
    const btnRef=useRef()
    const onChange=()=>{
        setCount(count+1)//不会立马运行会等到事件完全走完以后一起运行, 同时多个更改会合并到一起执行
        console.log(count)
        setCount(count+3)//因为是一步的, 运行到第二个setCount的时候count的基础值还是0
        console.log(count+2)

    }
    const onChange2=()=>{
        // 如果我们确实需要进行对num的两次更改请务必使用回调函数的方式
        setCount(c=>c+1)// 传入的函数会在事件走完以后按照顺序依次执行 
        console.log(count)
        setCount(c=>c+5)
        console.log(count)

    }
    useEffect(()=>{
        btnRef.current. addEventListener('click',()=>{
            setCount(c=>c+1)
            console.log(count)
            setCount(c=>c+1)
            console.log(count)
        })
    },[])
    return <div>
        {count}
        <button onClick={onChange}>+1</button>
        <button onClick={onChange2}>+1</button>

        <button  ref={btnRef}>+2</button>
    </div>

}