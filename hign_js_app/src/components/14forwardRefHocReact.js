import React from "react";
import { CustomTextInputHOC } from "../hocs/CustomTextInputHOC";
import FancyButton from '../hocs/FancyButton'


export default class Index extends React.Component{
constructor(props){
  super(props)
  this.bRef=React.createRef();
}
  render(){
      return(
        <>
          <div onClick={e=>{
                    console.log(this.bRef.current)
                }}>dnawo</div>
         <FancyButton ref={this.bRef}></FancyButton>
        </>
      )
  }
}

// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       text: "nihao"
//     };
//     this.inputRef = React.createRef();
//   }
//   onTextChange = event => {
//     event.persist();
//     this.setState({
//       text: event.target.value
//     });
//   };
//   onFocus = () => {
//     this.inputRef.current.focus();
//   };
//   render() {
//     return (
//       <div>
//         <input ref={this.inputRef} onChange={this.onTextChange} />
//         <div>{this.state.text}</div>
//       </div>
//     );
//   }
// }
// export default CustomTextInputHOC(CustomTextInput);
