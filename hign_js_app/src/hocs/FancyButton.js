import React from "react";

function logProps(WrappedComponent) {
   class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
        const {forwardRef,...others}=this.props
      return <WrappedComponent {...others} ref={forwardRef}></WrappedComponent>
    }
  }

  return React.forwardRef((props,ref)=>{
      return <LogProps {...props} forwardRef={ref}></LogProps>
  })
}

class FancyButton extends React.Component {
  render() {
    return (
      <button>
        点我
      </button>
    )
  }
}
export default logProps(FancyButton);