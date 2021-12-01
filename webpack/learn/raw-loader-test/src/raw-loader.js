const {getOptions,interpolateName}=require('loader-utils')
const fs=require('fs');
const path = require('path');
module.exports = function (source,map,meta) {
    const{name,a}=getOptions(this)
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    // this.callback(new Error('t'),json,1,2)


    //异步loader begin
    /*
    let callback=this.async()
    fs.readFile(path.join(__dirname,'./async.txt'),'utf-8',(err,data)=>{
            if(err){
                callback(err)
            }
            callback(null,data)
    })
     //异步loader end
    */
    let ext=interpolateName(this,'js/[hash].[ext]',{source})
    return `export default ${json}`
}
// module.exports.raw = true;//设置这个source就是Buffer类型