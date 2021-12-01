import React from 'react';

const  Todo=(props)=>{
    const {text,list}=props
        return <div>
            <ui>
                {
                    list&&list.map(e=>  <li>{e}</li>)
                }
             
            </ui>
        </div>
}

export default Todo;