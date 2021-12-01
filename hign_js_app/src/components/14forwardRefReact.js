import React from 'react'

const FancyButton = React.forwardRef((props, ref) => {
    return <button ref={ref} class='fancy-button'>
        {props.children}
    </button>
})

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }
    render() {

        return (
            <>
                <div onClick={e=>{
                    console.log(this.ref.current)
                }}>dnawo</div>
                <FancyButton ref={this.ref}>点我</FancyButton>
            </>
        )
    }
}