const http = require('http')
const minimist=require('minimist')
const chalk=require('chalk')
const PropgressBar=require('progress')
const hostname = '127.0.0.1'
const port = 3000

const server=http.createServer((req,res)=>{
    res.statusCode=200
    res.setHeader('Content-Type','text/plain');
    console.log(process.env.NODE_ENV)
    res.end('nihao!')

})

server.listen(port,hostname,()=>{
    console.log('start')
})
process.argv.forEach((ele,index)=>{
    console.log(`${ele},${index}`)
})
console.log('----------------')
let args= process.argv.slice(2);
console.log(args)
console.log('---------------------------')
const params=minimist(process.argv.slice(2));
console.log(params['name'])
setTimeout(() => {
    //process.exit(1)
}, 5000);

console.log('我的%s','猫')

console.error(3,1)

console.log(chalk.cyanBright('黄色'))

console.log('---------------------------')

const bar=new PropgressBar(':bar',50);
const timer=setInterval(()=>{
        bar.tick()
        if(bar.complete){
            clearInterval(timer)
        }
},100)

const readLine=require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
})

readLine.question("what your name?",name=>{
        console.log(`name`,name)
        readLine.close()
})