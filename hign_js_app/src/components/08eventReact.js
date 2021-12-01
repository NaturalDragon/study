import React, { Component } from 'react';
class QrCode extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickQr = this.handleClickQr.bind(this);
        this.state = {
            active: false,
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', e => {
            if(e.target&&e.target.matches('img')){
                return
            }
            console.log('laile')
            this.setState({
                active: false,
            });
        });
    }
    componentWillUnmount() {
        document.body.removeEventListener('click');
    }
    handleClick(e) {
        
        e.stopPropagation()
        console.log('zhix')
        this.setState({
            active: !this.state.active,
        });
    }
    handleClickQr(e) {
        e.stopPropagation();
    }
    render() {
        return (
            <div className="qr-wrapper">
                <button className="qr" onClick={this.handleClick}>二维码</button>
                <div 
                ar
                    className="code"
                    style={{ display: this.state.active ? 'block' : 'none' }}
                    onClick={this.handleClickQr}
                >
                    <img src={require('../assets/logo512.png')} alt="qr" />
                </div>
            </div>
        );
    }
}
export default QrCode;