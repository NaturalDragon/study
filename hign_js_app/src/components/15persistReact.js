import React from 'react';


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    add=(e)=>{
        
        setTimeout(()=>{
           this.filterContent(e)
        },1000)
    }
    filterContent=(kewword)=>{
        console.log(kewword)
        this.setState({
            count:this.state.count+1
        })
    }
    render() {
        return (
            <div>
               <input type='text'  onChange={e=>
               {
                   e.persist()
                setTimeout(()=>{
                    this.filterContent(e.target.value)
                },200)
               }
             }></input>

                <label>{this.state.count}</label>
            </div>
        )
    }

}