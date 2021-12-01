import React from 'react'

var scope='global scope'
/**
 * 
function checkscope(){
    var scope='local scope';
    function  f(){
        return scope
    }
    return f()
}
console.log(checkscope())
 */


function checkscope(){
    var scope='local scope';
    debugger
    function  f(){
        return scope
    }
    return f;
}

console.log(checkscope()())
export default function Index(){
    return<div>
        scope
    </div>
}