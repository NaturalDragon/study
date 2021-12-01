import Title from '../formItemConfig/title'
import { FomrBuilderMode } from '../../enums/formBulderMode'
import { FormItemType } from '../../enums/formItemType'
import react from 'react'
const  InputForm=react.memo(({onChange})=>{
    console.log('数字更新了2')
    return <input onChange={e=>{onChange(e.target.value)}} type='number'></input>
})

const SingleText = react.memo((props) => {
    console.log('数字更新了')
    debugger
    const { mode } = props
    const { onChange } = props
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
    itemType: FormItemType.Number,
    name: "数字",
    Component: SingleText,
    valueType: "string",
}