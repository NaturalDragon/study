


import React from 'react'

var foo = {
    value: 'value',

}
function bar(name, age) {
    debugger
    console.log(this.value)
    console.log(name)
    console.log(age)
    return {
        value: this.value,
        name,
        age
    }
}

Function.prototype.call2 = function (context) {
    context = Object(context)
    context.fn = this;
    var args = []
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    //context.fn()
    var result = eval('context.fn(' + args + ')')
    delete context.fn;
    return result;
}


//var dd= bar.call2(foo,'lzn',20)

//bar.call2(1,'11',20)


Function.prototype.apply2 = function (context, arr) {
    context = Object(context);
    debugger
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn;
    return result;
}

//bar.apply2(foo,['name',20])


Function.prototype.bind2 = function (context) {
    var self = this;
    debugger
    var args = Array.prototype.slice.call(arguments, 1)
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        debugger
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    fBound.prototype = this.prototype
    return fBound;
}

function bar2(name, age, sex) {
    console.log(name);
    console.log(age)
    console.log(sex)
    debugger
    console.log(this.value)
    this.friend = 'frend'
    return this.value;
}

// var sb=bar2.bind2(foo,'cy')(10,'nan')
// console.log(sb)


// var bindFoo=bar2.bind2(foo,"cy");
// var obj=new bindFoo(10,'nan')
// console.log(obj.friend)

function Person() {
    this.name = 'lzn';
    this.age = 18;
    return {a:1,b:2};
}

function _new() {
    var obj = {}
    var Constructor = arguments[0]//[].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
   var result =Constructor.apply(obj, arguments)
    return typeof obj==='object'?result:obj ;
}

var per =_new(Person)

console.log(per.name)
export default class Index extends React.PureComponent {

    componentDidMount() {

    }

    test=(e)=>{
debugger
    }
    render() {
        return (<div onClick={this.test}>
            Simulation
        </div>)
    }
}