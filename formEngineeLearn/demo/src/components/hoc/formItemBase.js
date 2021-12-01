import react from "react";
import {FomrBuilderMode} from '../../enums/formBulderMode'
import FormBase from './formBase'
/**
 * 普通控件基类
 * @param {*} Wrapper 
 * @returns 
 */
function FormItemBase(Wrapper) {
    function Item(props) {
        const { mode } = props;
        const {Component,...otherProps}=props
        switch (mode) {
            case FomrBuilderMode.form:
                return <Wrapper {...otherProps} mode={mode}></Wrapper>
            case FomrBuilderMode.option:
                return <Wrapper {...otherProps} mode={mode}></Wrapper>
            default:
                return <div>控件加载失败itemBase</div>
        }
    }
    return  FormBase(Item);
}
export default FormItemBase;