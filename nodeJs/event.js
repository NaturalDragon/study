const { EventEmitter, errorMonitor } = require('events')

class MyEventEmitter extends EventEmitter {

}

const myEventEmitter = new MyEventEmitter();

myEventEmitter.on('error', (error) => {
    console.log('eee' + error)
})
// myEventEmitter.on(errorMonitor, (error) => {
//     console.log('eee' + error)
// })
myEventEmitter.emit('error', new Error('err'))