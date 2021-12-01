import Title from '../formItemConfig/title'
import { FomrBuilderMode } from '../../enums/formBulderMode'
import { FormItemType } from '../../enums/formItemType'
import react from 'react'
const  InputForm=react.memo(({onChange})=>{
    console.log('单行文本更新了2')
    return <input onChange={e=>{onChange(e.target.value)}} type='text'></input>
})

const  SingleText=react.memo((props)=> {
    console.log('单行文本更新了')
    const { mode } = props
    const {onChange}=props
    switch (mode) {
        case FomrBuilderMode.table:
        case FomrBuilderMode.form:
            return <InputForm onChange={onChange} {...props}></InputForm>
        case FomrBuilderMode.option:
            return <>
                <Title.Component {...props}></Title.Component>
            </>
        default:
            return <div>mode错误</div>
    }
})
export default {
    itemType: FormItemType.SingleText,
    name: "单行文本",
    Component: SingleText,
    valueType: "string",
}