import React, { useState, useRef, useEffect, memo } from 'react'
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Scroll from '../scroll/index';
import style from '../../assets/global-style'

const List = styled.div`
display:flex;
align-items:center;
height:30px;
justify-content:center;
overflow:hidden;
>span:first-of-type{
    display:block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;

}
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 5px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen(props) {
    const { list, title ,value} = props;
    const {handleClick}=props
    const Category = useRef();
    useEffect(() => {
        let categoryDOM = Category.current;
        let tagElemets = categoryDOM.querySelectorAll('span')
        let totalwidth = 0;
        Array.from(tagElemets).forEach(ele => {
            totalwidth += ele.offsetWidth
        })
       // totalwidth += 2;
        categoryDOM.style.width = `${totalwidth}px`
    })
    const clickHandle = (item) => {
        handleClick(item.key);
      }
    return (
        <Scroll >
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map(ele => {
                            return (<ListItem className={ele.key===value?'selected':''} onClick={()=>{clickHandle(ele)}} key={ele.key} >{ele.name}</ListItem>)
                        })
                    }

                </List>
            </div>
        </Scroll>
    )
}


Horizen.defaultProps = {
    title: '',
    value:'',
    list: [],
    handleClick: null
}
Horizen.propTypes = {
    title:PropTypes.string,
    value:PropTypes.string,
    list: PropTypes.array,
    handleClick: PropTypes.func
}

export default memo(Horizen)