import React from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import PropTypes from "prop-types";
import './index.less'
// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef ((props, ref) => {
  const { handleClick, title,isMarquee} = props;
  return (
    <div className='headerContainer' ref={ref}>
      <i className="iconfont back"  onClick={handleClick}>&#xe655;</i>
      {
        isMarquee?
        <h1 className='Marquee'><div className='text'>{title}</div></h1>
        :
        <h1>{title}</h1>
      }
     
      {/* <marquee>{title}</marquee> */}
    </div>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee:false
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee:PropTypes.bool
};

export default React.memo (Header);