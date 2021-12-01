import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
const loginUser = {
    id: 1,
    name: 'lzn'
}
/**
 * 一、属性代理 实现 HOC 
 * 1.组合渲染
 * 2.条件渲染
 * 3.操作props
 * 4.获取refs
 * 5.抽象state 状态管理
 * @param {} WrappedComponent 
 */
export function PropsProxyHoc(WrappedComponent) {

    class PP extends React.Component {
        render() {
            return <WrappedComponent {...this.props}></WrappedComponent>
        }

    }
    // pp.info=WrappedComponent.info;
    //pp.success=WrappedComponent.success;
    /**
     * 我们可以使用hoist-non-react-statics来帮助我们解决这个问题，它可以自动帮我们拷贝所有非React的静态方法
     */
    hoistNonReactStatic(PP, WrappedComponent)
    return PP;
}
/**
 * 组合渲染(属性代理)
 * @param {*} WrappedComponent 
 */
export function stylePPHoc(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <>
                    <div class='title'>{this.props.title}</div>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </>
            )
        }
    }
}

/**
 * 条件渲染（属性代理）
 * @param {} WrappedComponent 
 */
export function visiblePPHoc(WrappedComponent) {
    return class extends React.Component {
        render() {
            if (!this.props.visible) return null;
            return <WrappedComponent {...this.props}></WrappedComponent>;
        }
    }
}

/**
 * 操作props（属性代理）
 * @param {*} WrappedComponent 
 */
export function optPorpsPPHoc(WrappedComponent) {
    return class extends React.Component {
        render() {
            const newProps = {
                user: loginUser
            }
            return <WrappedComponent {...this.props} {...newProps}></WrappedComponent>
        }
    }
}
/**
 * 获取refs（属性代理）
 * @param {*} WrappedComponent 
 */
export function refPPHoc(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} ref={ref => this.wrapRef = ref}></WrappedComponent>
        }
    }
}

/**
 * 状态管理 实现一个简单的双向绑定 （属性代理）
 * @param {*} WrappedComponent 
 */
export function towwayBdPPHoc(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = { value: '' }
        }
        onChange = (event) => {
            debugger
            const { onChange } = this.props;
            this.setState({
                value: event.target.value
            }, () => {
                if (typeof onChange === 'function') {
                    onChange(event)
                }
            })
        }

        render() {
            const newProps = {
                value: this.state.value,
                onChange: this.onChange
            }
            return <WrappedComponent {...this.props} {...newProps} ></WrappedComponent>
        }
    }
}
//--------------------------------------------------------------------------------------------------------------------------------

/**
 * 二、反向继承 实现HOC
 * 1.组合渲染
 * 2.条件渲染
 * 3.操作state
 * 4.渲染劫持
 * @param {*} WrappedComponent 
 */
export function InheritanceInversionHoc(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return super.render();

        }
    }
}
/**
 * 组合渲染(反向继承)
 */
export function styleIIHoc(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return (
                <>
                    <div class='title'>{this.props.title?this.props.title:'没有标题'}</div>
                    {super.render()}
                </>
            )
        }
    }
}
/**
 * 条件渲染（反向继承）
 * @param {*} WrappedComponent 
 */
export function visibleIIHoc(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            if (!this.props.visible) return null
            return super.render()
        }
    }
}

/**
 * 操作state（反向继承）
 * @param {*} WrappedComponent 
 */
export function debugIIHoc(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return (
                <div>
                    <h2>HOC Debugger Component</h2>
                    <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
                    <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
                    {super.render()}
                </div>
            )
        }
    }
}


/**
 * 渲染劫持 ---按钮权限（反向继承）
 * @param {*} WrappedComponent 
 */
export function hijackIIHoc(WrappedComponent) {

    const checkAuth = (props) => {
        let { auth } = props;
        // No Auth required
        if (auth == null) {
            return true;
        }
        return false;
    }
    return class extends WrappedComponent {
        render() {
            if (checkAuth(this.props)) {
                return super.render();
            }
            else {
                const noAuthType = this.props.noAuthType || 'hidden';
                if (noAuthType === 'hidden') {
                    return null;
                } else if (noAuthType === 'disabled') {
                    return React.cloneElement(super.render(), { disabled: true, title: '无此操作权限' })
                }
                else {
                    throw new Error('noAuthType必须是hidden或disabled');
                }
            }
        }
    }
}
/**
 * compose函数组合方法
 * @param  {...any} fns 
 */
//export const compose = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
export function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
@PropsProxyHoc
class message extends React.Component {
    static info() {
        console.log('我是静态方法')
    }
    static success(msg) {
        console.log(msg)
    }
}

export default message