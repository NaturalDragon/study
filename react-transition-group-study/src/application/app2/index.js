import { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.css'
export default function Index() {
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);

    const onToggle = () => {
        // setShow(!show)
        setCount((count + 1) % 2)
    }

    return (
        <div className='container'>
            <TransitionGroup className='square-wrapper'>
                <CSSTransition
                    key={count}
                    classNames='fade'
                    timeout={500}>
                    <div className='square' >{count}</div>
                </CSSTransition>
            </TransitionGroup>


            <button onClick={onToggle}>toggle</button>
        </div>
    )
}