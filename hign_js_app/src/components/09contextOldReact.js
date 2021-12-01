import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
    render() {
        return (
            <button style={{ backgroundColor: this.context.color,color: this.context.frontColor}}>{
                this.props.children
            }</button>
        )
    }
}
Button.contextTypes = {
    color: PropTypes.string,
    frontColor:PropTypes.string
}

class Message extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.text
                }
                <Button>delete--{this.context.frontColor}</Button>
            </div>
        )
    }
}
Message.contextTypes={
    color: PropTypes.string,
    frontColor:PropTypes.string

}
class MessageList extends React.Component {
    getChildContext() {
        return {
            color: 'red',
            frontColor:'white'
        }

    }
    render() {
        const children = this.props.messages.map(ele => <Message text={ele.text}></Message>)
        return (
            <div>  {children}</div>
        )
    }
}

MessageList.childContextTypes = {
    color: PropTypes.string,
    frontColor:PropTypes.string
}

export default MessageList;