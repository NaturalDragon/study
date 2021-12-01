import React from "react";

export function CustomTextInputHOCOld(WrapComp) {
  return class extends React.Component {
    render() {
      const { createRefFunc, name } = this.props;
      return <WrapComp ref={createRefFunc} name={name} />;
    }
  };
}

export function CustomTextInputHOC(WrapComp) {
  class MyComp extends React.Component {
    render() {
      const { forwardRef, name } = this.props;
      return <WrapComp ref={forwardRef} name={name} />;
    }
  }
  debugger
  return React.forwardRef((props, ref) => {
    return <MyComp {...props} forwardRef={ref} />;
  });
}
