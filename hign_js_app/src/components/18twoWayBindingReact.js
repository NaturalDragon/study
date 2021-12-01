import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Form extends Component {
    static childContextTypes = {
        model: PropTypes.object,
        changeModel: PropTypes.func
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            model: props.model || {}
        };
    }
    componentWillReceiveProps(nextProps) {
        debugger
        if (nextProps.model) {
            this.setState({
                model: nextProps.model
            })
        }
    }
    changeModel = (name, value) => {
        this.setState({
            model: { ...this.state.model, [name]: value }
        })
    }
    getChildContext() {
        return {
            changeModel: this.changeModel,
            model: this.props.model || this.state.model
        };
    }
    onSubmit = () => {
        console.log(this.state.model);
    }
    render() {
        return <div>
            {this.props.children}
            <button onClick={this.onSubmit}>提交</button>
        </div>
    }
}

function proxyHoc(WrappedComponent) {
     class ProxyHoc extends Component {
        static contextTypes = {
            model: PropTypes.object,
            changeModel: PropTypes.func
        }
        componentDidMount(){
            const { changeModel } = this.context
            const { v_model ,value} = this.props;
            debugger
            changeModel(v_model, value);
        }
        // componentWillReceiveProps(nextProps){
        //     debugger
        //     const { changeModel } = this.context
        //     const { v_model ,value} =nextProps;
            
        //     changeModel(v_model, value);
        // }
      
        onChange = (event) => {
            debugger
            const { changeModel } = this.context;
            const { onChange } = this.props;
            const { v_model } = this.props;
            changeModel(v_model, event.target.value);
            if (typeof onChange === 'function') { onChange(event); }
        }

        render() {
            const { model } = this.context;
            const { v_model } = this.props;
            return <WrappedComponent
                {...this.props}
                value={model[v_model]}
                onChange={this.onChange}
            />;
        }
    }
    ProxyHoc.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return ProxyHoc;
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  
@proxyHoc
class Input extends Component {
    render() {
        return <input {...this.props}></input>
    }
}

export default class extends Component {
    render() {
      return (
        <Form >
          <Input v_model="name" value='2'></Input>
          <Input v_model="pwd" value='12'></Input>
        </Form>
      )
    }
  }
  