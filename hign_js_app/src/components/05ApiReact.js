import React from 'react'

class SnapshotSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],//用于保存子div
        }
    }

    handleMessage() {//用于增加msg
        this.setState(pre => ({
            messages: [`msg: ${pre.messages.length}`, ...pre.messages],
        }))
    }
    componentDidMount() {

        for (let i = 0; i < 20; i++) this.handleMessage();//初始化20条
        this.timeID = window.setInterval(() => {//设置定时器
            if (this.state.messages.length > 200) {//大于200条，终止
                window.clearInterval(this.timeID);
                return;
            } else {
                this.handleMessage();
            }
        }, 1000)
    }
    componentWillUnmount() {//清除定时器
        window.clearInterval(this.timeID);
    }
    getSnapshotBeforeUpdate() {//很关键的，我们获取当前rootNode的scrollHeight，传到componentDidUpdate 的参数perScrollHeight
        return this.rootNode.scrollHeight;
    }
    componentDidUpdate(perProps, perState, perScrollHeight) {
        const curScrollTop = this.rootNode.scrollTop;
        if (curScrollTop < 5) return;
        this.rootNode.scrollTop = curScrollTop + (this.rootNode.scrollHeight - perScrollHeight);
        //加上增加的div高度，就相当于不动
    }
    render() {

        return (
            <div className='wrap' ref={node => (this.rootNode = node)} >
                {this.state.messages.map(msg => (
                    <div>{msg} </div>
                ))}
            </div>
        );
    }
}
class Children extends React.Component {

    constructor(props, context) {
        debugger
        super(props)
        this.state = {
            list: props.list
        }
    }
    // componentWillMount() {
    //     debugger

    // }
    componentDidMount() {
        debugger
        this.setState({
            myCount: 1
        })

    }

    componentWillUnmount() {
        debugger
    }
    // componentWillReceiveProps(nextProps) {
    //    // 在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。
    //     this.setState({list:nextProps.list})
    //     debugger
    // }

    shouldComponentUpdate(nextProps, nextState) {
        debugger
        return true;
    }

    // componentWillUpdate(nextProps, nextState) {
    //     debugger
    // }

    componentDidUpdate(prevProps, preState) {
        debugger
    }
    componentDidCatch(error, info) {
        debugger
    }
    static getDerivedStateFromError() {

    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        debugger
    }
  
    static getDerivedStateFromProps(nextProps, prevState) {
         throw new Error('EE')
        const { list } = nextProps;
        if (list !== prevState.list) {
            return { list }
        }
        return null
        debugger
    }
    render() {
       
        return (<div>
            <ul>
                {
                    this.state.list &&
                    this.state.list.map(ele => <li>{ele.name}</li>)
                }

            </ul>
        </div>)
    }
}
//生成随机 GUID 数
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export default class Parent extends React.Component {

    constructor(props, context) {
        debugger
        super(props)
        this.state = {
            count: 1,
            list: []
        }
    }

    componentWillMount() {
        debugger

    }
    componentDidMount() {
        debugger
        this.setState({
            count: this.state.count + 1
        })
        new Promise((resolve, reject) => {
            resolve();

        }).then(res => {
            this.setState({
                list: [{ name: 'lizn' }]
            })
        })
    }

    componentWillUnmount() {
        debugger
    }
    componentWillReceiveProps(nextProps) {
        debugger
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        debugger
      
    }

    componentDidUpdate(prevProps, preState) {
        debugger
    }
    componentDidCatch(error, info) {
        debugger
    }
    static getDerivedStateFromError(error){
        debugger
    }
    //  getSnapshotBeforeUpdate(prevProps,prevState) {
    //     debugger
    // }
    // static getDerivedStateFromProps(nextProps,prevState) {
    //     debugger
    // }
    add = () => {
        let { list } = this.state;
        list.push({ name: guid() })
        this.setState({
            list
        })
    }
    render() {
        return (<div>

            {this.state.count}
            <button onClick={this.add}>新增</button>
            <Children list={this.state.list}></Children>


            {/* <SnapshotSample /> */}
        </div>)
    }
}

