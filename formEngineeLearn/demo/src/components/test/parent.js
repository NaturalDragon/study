import react,{useState,useEffect,useCallback} from "react";
const Child = react.memo( (props) => {
    console.log("公众号：前端开发爱好者 的子组件，我更新了...");
   return (
       <div>
           <h3>子组件</h3>
           <div>text:{props.name}</div>
           <div> <input onChange={props.handleInputChange} /></div>
           <div>{new Date().getTime()}</div>
       </div>
   )
})
const Parent = () => {
   const [count, setCount] = useState(0);
   const [text, setText] = useState("")
   const handleClick = () => {
       setCount(count + 1);
   }
   const handleInputChange =useCallback((e)=>{
    setText(e.target.value)
   },[])
   return (<div>
       <button onClick={handleClick}>+1</button>
       <div>count:{count}</div>
       <Child name={text} handleInputChange={handleInputChange}/>
   </div>)
}

export default Parent