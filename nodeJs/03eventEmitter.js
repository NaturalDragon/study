const EventEmitter=require('events');

const eventEmitter=new EventEmitter();


eventEmitter.on('start',(...args)=>{
    console.log('开始')
    console.log(args)
})

eventEmitter.emit('start',1,2,3)


class MyEvent extends EventEmitter{}

const myEvent=new MyEvent();
myEvent.on('start',function(...args){
    console.log(args);
    console.log(this)
    console.log(this===myEvent)
})
console.log('``````')
myEvent.on('start',(...args)=>{
    console.log(args, this, this === myEvent);
})

myEvent.emit('start',4,5,6)