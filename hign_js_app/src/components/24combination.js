/**组合模式 */
/**使用者只需要传递子组件， */


import React from 'react';
import PropTypes from 'prop-types';
class Tabs extends React.Component{
    state={
        activeIndex:0
    }
    onClickItem = (index) => {
        this.setState({ activeIndex: index });
        this.props.onChange&&this.props.onChange(index);
      };
    
      renderHeaderItem = () => {
        const {
          state: { activeIndex },
          props: { children },
        } = this;
        return React.Children.map(children, (childElem, index) => {
          if (!childElem.type) return null;
          const active = activeIndex === index;
          return (
            <div
              style={{
                maxWidth: '150px',
                color: active ? 'red' : 'green',
                border: active ? '1px red solid' : '0px',
              }}
              onClick={() => this.onClickItem(index)}
            >
              {childElem.props.tab}
            </div>
          );
        });
      };
    render(){
        const {activeIndex}=this.state
        const {children}=this.props
        return(
            <div>
<div style={{ display: 'flex' }}>
          {this.renderHeaderItem()}
        </div>
                {
                    React.Children.map(children,(childEle,index)=>{
                        if(!(childEle.type&&activeIndex===index))return null;
                        return React.cloneElement(childEle,{
                            activeIndex,index
                        })
                    })
                }
            </div>
        )
    }
}
const TabPane=({children})=>{
        return <div
        style={{
          width: '100%',
          minHeight: 400,
          border: '1px #fff solid',
        }}
      >
        {children}
      </div>
}

export default function Combinaion(){
    return <div>
        <Tabs>
            <TabPane tab="One">
            <div>内容1</div>
            </TabPane>
            <TabPane tab="tow">
            <div>内容2</div>
            </TabPane>
        </Tabs>
    </div>
}