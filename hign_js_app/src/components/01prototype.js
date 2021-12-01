
import React from 'react'

var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

export default function Index(){
    return<div>
        1
    </div>
}