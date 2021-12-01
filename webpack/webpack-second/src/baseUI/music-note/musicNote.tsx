/** @format */

import * as React from 'react'
import {prefixStyle} from '@/api/prefixStyle'
import {IAnimalData} from '@/interfaces/musiceNote'
import './musicNote.less'
const {useEffect, useImperativeHandle, useRef, forwardRef} = React

const MusicNote = forwardRef((props, ref) => {
    const iconsRef = useRef<HTMLDivElement>()
    // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
    const ICON_NUMBER = 3

    const transform = prefixStyle('transform')

    // 原生 DOM 操作，返回一个 DOM 节点对象
    const createNode = (txt: string) => {
        const template = `<div class='icon_wrapper'>${txt}</div>`
        let tempNode = document.createElement('div')
        tempNode.innerHTML = template
        return tempNode.firstChild
    }
    const startAnimation = ({x, y}: IAnimalData) => {
        for (let i = 0; i < ICON_NUMBER; i++) {
            let domArray = [].slice.call(iconsRef.current.children)
            let item = domArray[i]
            // 选择一个空闲的元素来开始动画
            if (item.running === false) {
                item.style.left = x + 'px'
                item.style.top = y + 'px'
                item.style.display = 'inline-block'

                setTimeout(() => {
                    item.running = true
                    item.style[transform] = `translate3d(0, 750px, 0)`
                    let icon = item.querySelector('div')
                    icon.style[transform] = `translate3d(-40px, 0, 0)`
                }, 20)
                break
            }
        }
    }
    // 外界调用的 ref 方法
    useImperativeHandle(ref, () => ({
        startAnimation,
    }))
    useEffect(() => {
        for (let i = 0; i < ICON_NUMBER; i++) {
            let node = createNode(`<div class="iconfont">&#xe642;</div>`)
            iconsRef.current.appendChild(node)
        }
        // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
        let domArray = [].slice.call(iconsRef.current.children)
        domArray.forEach(item => {
            item.running = false
            //let  this;typeof item;
            item.addEventListener(
                'transitionend',
                () => {
                    item.style['display'] = 'none'
                    item.style[transform] = `translate3d(0, 0, 0)`
                    item.running = false

                    let icon = item.querySelector('div')
                    icon.style[transform] = `translate3d(0, 0, 0)`
                },
                false,
            )
        })
        //eslint-disable-next-line
    }, [])

    return <div className="container" ref={iconsRef}></div>
})

export default React.memo(MusicNote)
