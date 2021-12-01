module.exports=function loader(source){

    console.log('simple-loader-with-pitch is running')
    return source;

}

module.exports.pitch=function(){
    console.log('pitching graph----simple-loader-with-pitch')
}