import react,{useCallback} from "react";
import {FomrBuilderMode} from '../../enums/formBulderMode'
/**
 * 表单控件基类
 * @param {*} Wrapper 
 * @returns 
 */
function FormItemBase(Wrapper) {
   
    function Item(props) {
        const { mode } = props;
        const {Component,...otherProps}=props
        const {setValueSingle}=props;
        const onChange=useCallback((data)=>{
            setValueSingle(data)
        },[])
        switch (mode) {
            case FomrBuilderMode.form:
                return <Wrapper {...otherProps} onChange={onChange} mode={mode}></Wrapper>
            case FomrBuilderMode.option:
                return <Wrapper {...otherProps} mode={mode}></Wrapper>
            default:
                return <div>控件加载失败itemBase</div>
        }
    }
    return Item;
}
export default FormItemBase;