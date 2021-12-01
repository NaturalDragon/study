import React, { Component } from 'react'
import ReactDOM from 'react-dom';


function parentClick(e){
debugger
}

export default function App() {
  return (
    <div onClick={parentClick}>
      <Modal>
            <div style={{height:50,width:50,backgroundColor:'red'}}>
              wode 
            </div>
      </Modal>
    </div>
  )
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    document.body.appendChild(this.el)
  }
  componentWillUnmount() {
    document.body.removeChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    )
  }
}

