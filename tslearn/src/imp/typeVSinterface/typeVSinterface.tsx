import * as React from 'react';

interface User {
  name: string;
  age: number;
}

interface SetUser {
  (name: string, age: number): void;
}

type User1 = {
  name: string;
  age: number;
};
type SetUser1 = (name: string, age: number) => void;

interface Name {
  name: string;
}
interface Person extends Name {
  age: number;
}
const per: Person = { name: '', age: 1 };

type Name1 = {
  name: string;
};

type Person1 = Name1 & {
  age: number;
};
const p2: Person1 = { name: '1', age: 19 };

interface Student {
  name: string;
}
interface Student {
  age: number;
}
interface Student {
  bithday: Date;
}
const stu: Student = { age: 19, name: 'pp', bithday: new Date() };

// type S = {
//   name: string;
// };
// type S = {
//   age: number;
// };

interface A {
  name:string
}
interface B{
  age:number
}
interface C extends A,B{

}

let cc:C={ name:'',age:12}
export default function Index() {
  return <div>type VS interface</div>;
}
