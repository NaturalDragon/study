module.exports=function loader(source){

    console.log('%c simple-loader is running','color:red')
    return source;

}

module.exports.pitch=function(){
    console.log('pitching graph----simple-loader')
}