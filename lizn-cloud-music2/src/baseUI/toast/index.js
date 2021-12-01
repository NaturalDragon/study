import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.less'

const Toast = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [timer, setTimer] = useState('')
    const { text } = props;
    useImperativeHandle(ref, () => {
       return{
           show(){
            if (timer) clearTimeout(timer)
            setShow(true)
            let t = setTimeout(() => {
                setShow(false)
            }, 3000);
            setTimer(t)
           }
       }
    })
    return (<CSSTransition
        classNames='toast'
        in={show}
        timeout={300}
        unmountOnExit
    >
        <div className='toastWrapper'>
            <div className='toastText'>{text}</div>
        </div>
    </CSSTransition>)
})

export default React.memo(Toast)