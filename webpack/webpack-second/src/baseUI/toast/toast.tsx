import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import './toast.less'
import {IToastProps,IToastRef} from '@/interfaces/toast'
const { useRef, useEffect, useState, forwardRef, useImperativeHandle } =React;
const Toast = forwardRef((props:IToastProps, ref) => {
    const [show, setShow] = useState(false)
    const [timer, setTimer] = useState<number>(0)
    const { text } = props;
    useImperativeHandle(ref, () => {
       return{
           show(){
            if (timer) clearTimeout(timer)
            setShow(true)
            let t:any = setTimeout(() => {
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