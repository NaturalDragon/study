import React from 'react';
import { addTodo } from './../actions/index'
import ToDo from './../components/todo'
import { connect } from 'react-redux';


const AddTodo = ({ dispatch,todos }) => {
const {list}=todos;
  const add=(text)=>{
      debugger
      var  newlist=list||[]
      newlist.push(text)
        dispatch(addTodo(text,newlist))
  }
    return <div>
        <ToDo {...todos}></ToDo>
        <button onClick={e => {
            e.preventDefault();
            debugger
            add("我去")
        }}>add</button>
    </div>
}
const  mapStateToProps=state=>({
    
    todos:state.todos
})
export default connect(mapStateToProps)(AddTodo)