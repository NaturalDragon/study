import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.css'
export default function Index() {
    const [show, setShow] = useState(false);
    const onToggle = () => {
        setShow(!show)
    }
    return (
        <div className='container'>
            <div className='square-wrapper'>
                <CSSTransition
                    in={show}
                    classNames='fade'
                    timeout={500}>
                    <div className='square' />
                </CSSTransition>
            </div>

            <button onClick={onToggle}>toggle</button>
        </div>
    )
}