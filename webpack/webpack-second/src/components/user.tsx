import * as  React from 'react';
import {getUserList,login} from '../actions/index'
import {UserComInterface} from '../interfaces/user'

export default class User extends React.Component<UserComInterface>{

    componentDidMount(){
        const {dispatch}=this.props;
        dispatch(getUserList({}))
    }
 
    render(){
        const{list} =this.props
        debugger
        return (<div>
                   {
                       list &&list.map(ele=><div key={ele.id}>{ele.name}</div>)
                   }
                  
            </div>)
    }
}

// export default function User(props:any):any{
//     useEffect(()=>{
        
//                 props.dispatch(getUserList({}))
//             })
//     const {selectSubreddit}=props
//     return (<div>
      
//     </div>)
// }