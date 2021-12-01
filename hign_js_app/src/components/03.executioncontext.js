import React from 'react'



// var foo=function(){
//     console.log('foo1');
// }

// foo();

// var foo=function(){
//     console.log('foo2');
// }
// foo()

// function foo() {

//     console.log('foo1');

// }

// foo();  // foo2

// function foo() {

//     console.log('foo2');

// }

//foo(); // foo2
// console.log(f1)
// function f1(){}
// console.log(f2())
// var f2=function(){

// }

// function test(arg){
//     console.log(arg);

//     var arg='hello';
//     function arg(){
//         console.log('jel')
//     }
//     console.log(arg)
// }
// test('99')


function foo() {
    debugger
    console.log(this)
}
var a = 1;
foo()
const list = [{ name: '1232', id: 1111 }, { name: 'dfdfd', id: 2222 }, { name: '12eds', id: 3333 }]
export default function Index() {
    function pa(e) {
        console.log(e.target.id)
    }
    const islo=null

 
    return <div>
    
    {islo&& <ul onClick={e => pa(e)}>
            {list.map(ele => <li key={ele.id} id={ele.id}>{ele.name}</li>)}
        </ul>}
       
    </div>
}