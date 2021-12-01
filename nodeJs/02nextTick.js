
setImmediate(()=>{
    console.log(5) 
})
setTimeout(() => {
    console.log(4)  
}, 0);

process.nextTick(()=>{
    console.log(2)
})
new Promise((resolve,reject)=>{
    console.log(0)
    resolve('3')
}).then((res)=>{
    console.log(res)
})
console.log(1)

