import React from 'react'

class Children extends React.Component {

    
    render() {
      
        if (this.props.status === 0) {
            return (<div>0</div>)
        } else if (this.props.status === 1) {
            return (<div>1</div>)
        }
        else {
            return (<div dangerouslySetInnerHTML={{__html:'cc © 2015'}}>-1</div>)
        }
    }
}
// function Children({name}){
//     console.log(name)
//     return (<div>
//         2
//     </div>)
// }
export default function Parent() {

    return (<div>
        <Children status={0}></Children>
    </div>)
}


