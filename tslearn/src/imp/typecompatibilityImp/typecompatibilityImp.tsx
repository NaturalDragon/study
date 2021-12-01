import * as React from 'react';

interface Named {
  name: string;
}
class Person {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}
let p: Named;
p = new Person('li');

let p1: Named;
p1 = { name: 'zz' };

// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;
// y = x;

export default function Index() {
  return <div>1</div>;
}
