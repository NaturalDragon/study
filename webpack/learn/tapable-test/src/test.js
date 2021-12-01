const {SyncHook}=require('tapable')

const hook1=new SyncHook(['arg1','args2','args3'])
//绑定事件到webpack事件流
hook1.tap('hook1',(arg1,args2,args3)=>{
    console.log(arg1,args2,args3)
})
//执行绑定的事件
hook1.call(3,4,5)