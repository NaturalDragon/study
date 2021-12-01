import { useState, useEffect } from 'react';
import SingleText from '../formItemControl/singleText';
import NumberField from '../formItemControl/number';
import { FomrBuilderMode } from '../../enums/formBulderMode'
import {Guid} from '../../utils/common'
import FormItemBase from '../hoc/formItemBase'
import { useCallback } from 'react';
import './index.css'

const formControlList = [SingleText,NumberField]
function FormBuilder() {
    const [num, setNum] = useState(0)
    const [currentItem, setCurrentItem] = useState({ Component: () => <div>null</div> })
    const [formItemList, setFormItemList] = useState([])
    const onselect = (item) => {
        setCurrentItem(item)
    }
    const addFormItem = (ele) => {
        const exitisItem = formControlList.find(f => f.itemType === ele.itemType)
        const newFormItemList=formItemList.map(ele=>ele)
        if (exitisItem) {
            newFormItemList.push({
                id:Guid(),
                name: exitisItem.name,
                select: false,
                Component: FormItemBase(exitisItem.Component)
            })
            setFormItemList(newFormItemList)
        }
    }
    const setValueSingle=useCallback((value)=>{
        console.log(value)
    },[])
    return <div className='formBuilderWrapper'>

        <div className='formBuilderLeft'>
            {/* <button onClick={e => { setNum(num + 1) }}>refresh</button> */}
            {formControlList.map((ele, index) => <span key={index} onClick={e => { addFormItem(ele) }} className='itemSpan'>{ele.name}</span>)}
        </div>
        <div className='formBuilderCenter'>
            <div>
                {
                    formItemList.map((item, index) => <div onClick={e => { onselect(item) }} style={{ display: 'flex' }} key={index}>
                        <span>{item.name}</span>
                        <item.Component {...item} setValueSingle={setValueSingle} mode={FomrBuilderMode.form}></item.Component>
                    </div>)
                }
            </div>
        </div>
        <div className='formBuilderRight'>
            <currentItem.Component {...currentItem} mode={FomrBuilderMode.option}></currentItem.Component>
        </div>
    </div>
}

export default FormBuilder;