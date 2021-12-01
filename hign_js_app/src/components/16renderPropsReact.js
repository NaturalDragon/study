import React from 'react';
import logo from '../assets/logo512.png'
class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src={logo} style={{ width: 20, height: 20, position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

                {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
                {this.props.move(this.state)}
            </div>
        );
    }
}

export default class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <div>移动鼠标!</div>
                <input type="range"/>
                <React.StrictMode>
                    <Mouse move={mouse => (<Cat mouse={mouse}></Cat>)} />
                </React.StrictMode>
            </div>
        );
    }
}