import React, { useRef } from 'react';

/**
 * 回调函数创建ref
 */
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = null;

        this.setTextInputRef = element => {
            debugger
            this.textInput = element;
        };


    }
    focusTextInput = () => {
        // 使用原生 DOM API 使 text 输入框获得焦点
        if (this.textInput) this.textInput.focus();
    };
    componentDidMount() {
        // 组件挂载后，让文本框自动获得焦点
        this.focusTextInput();
    }

    render() {
        // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
        // 实例上（比如 this.textInput）
        return (
            <div>
                <input
                    type="text"
                    ref={this.setTextInputRef}
                />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}
function CustomTextInputD(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

class Parent extends React.Component {

    clickFn = () => {
        if (this.inputElement) this.inputElement.focus();
    }
    render() {
        return (
            <div>
                <CustomTextInputD
                    inputRef={ele => this.inputElement = ele}
                />
                <button onClick={this.clickFn}>dd</button>
            </div>
        );
    }
}

//--------------------------------------------------我是华丽的分割线----------------------------------------------------


/**
 * React.createRef() 创建ref
 */
class CustomTextInputFun extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    focusTextInput = () => {
        // 使用原生 DOM API 使 text 输入框获得焦点
        if (this.textInput) this.textInput.current.focus();
    };
    componentDidMount() {
        // 组件挂载后，让文本框自动获得焦点
        //this.focusTextInput();
    }

    render() {
        // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
        // 实例上（比如 this.textInput）
        return (
            <div>
                <input
                    type="text"
                    ref={this.textInput}
                />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}

function CustomTextFn() {
    return (<div>
        1
    </div>)
}
class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.customTextRef = React.createRef()
    }

    componentDidMount() {
        debugger
        this.customTextRef.current.focusTextInput();
    }

    render() {
        return (
            <CustomTextInput ref={this.customTextRef} />
        );
    }
}


//----------------------------------------------------------我分割线又回来了-----------------------------------------------------------

/**
 * 函数式组件创建ref
 * @param {*} props 
 */
function Person(props) {
    // 这里必须声明 textInput，这样 ref 才可以引用它
    const textInput = useRef(null)
    function handleClick() {
        textInput.current.focus();
    }

    return (
        <div>
            <input
                type="text"
                ref={textInput} />
            <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
            />
        </div>
    );
}
export default Person;