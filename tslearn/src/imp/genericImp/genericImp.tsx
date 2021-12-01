import * as React from 'react';

function identity<T>(arg: T): T {
  return arg;
}
identity<number>(9);

interface IIdentityFn {
  <T>(arg: T): T;
}
let myIdentity: IIdentityFn = function <T>(arg: T): T {
  return arg;
};

interface IIdentityFn2<T> {
  (arg: T): T;
}
let myIdentity2: IIdentityFn2<number> = function (arg: number): number {
  return arg;
};

class GenericNumber<T> {
  zeroValue: T;
  // static x: T;
  constructor(a: T) {
    this.zeroValue = a;
  }
}
const gen = new GenericNumber<number>(10);

interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
//loggingIdentity<number>(10);
loggingIdentity<string>('1213');
loggingIdentity({ length: 10, a: '00' });

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, 'a');

function create<T>(c: { new (): T }): T {
  return new c();
}

class BeeKeeper {
  hasMask = true;
}
class ZooKeeper {
  nametag = '';
}
class Animal {
  numLegs = 10;
}
class Bee extends Animal {
  keeper: BeeKeeper;
  constructor(k: BeeKeeper) {
    super();
    this.keeper = k;
  }
}
class Lion extends Animal {
  keeper: ZooKeeper;
  constructor(k: ZooKeeper) {
    super();
    this.keeper = k;
  }
}
function createIntance<A extends Animal>(c: new () => A): A {
  return new c();
}
// createIntance(Lion).keeper.nametag;

export default function Index() {
  return <div>genericImp.tsx</div>;
}
