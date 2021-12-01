import * as React from 'react';

function isNumber(x: any): x is number {
  return typeof x === 'number';
}
function isString(x: any): x is string {
  return typeof x === 'string';
}
function padLeft(value: string, padding: string | number) {
  // if (typeof padding === 'number') {
  //   return Array(padding + 1).join(' ') + value;
  // }
  // if (typeof padding === 'string') {
  //   return padding + value;
  // }
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value;
  }
  if (isString(padding)) {
    return padding + value;
  }

  throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft('hee', '');

interface Bird {
  fly(): void;
  layEggs(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}
//declare function getSmallPet(): Fish | Bird;
function getSmallPet(): Fish | Bird {
  return {
    fly() {
      console.log(1);
    },
    swim() {
      console.log(1);
    },
    layEggs() {
      console.log(1);
    },
  };
}
let pet = getSmallPet();
pet.layEggs();

let fishPet = pet as Fish;
let birdPet = pet as Bird;
if (fishPet.swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

let s: string | null = 'foo';
s = null;
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 1);

function fn(sn: string | null): string {
  return sn || 'dd';
}
console.log(fn(null));

function broken(name: string | null): string {
  return name!.charAt(0);
}

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
const square = 'square';
interface Square {
  kind: typeof square;
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius ** 2;
  }
}

class BasicCaculator {
  value: number;
  constructor(v: number) {
    this.value = v;
  }
  currentValue(): number {
    return this.value;
  }
  add(operand: number): this {
    this.value += operand;
    return this;
  }
  multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let v = new BasicCaculator(10).add(10).multiply(20).currentValue();
console.log(v);

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}
interface IPerson {
  name: string;
  age: number;
}
let person: IPerson = {
  name: 'dd',
  age: 20,
};
let ss: (string | number)[] = pluck(person, ['name', 'age']);
console.log(ss);

let personProp: keyof IPerson;
const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by',
};
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

console.log(getProperty(tagRegMap, 'album'));

interface Map<T> {
  [key: string]: T;
}

let keys: keyof Map<number>;
let values: Map<number>['dß'];

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
type PersonReadonly = Readonly<IPerson>;
type PersonPartial = Partial<IPerson>;
let perReadonly = { name: 'dd', age: 12 } as PersonReadonly;
let perPartial = {} as PersonPartial;

type Keys = 'op1' | 'op2';
type Flags = { [K in Keys]: boolean };

type Record<K extends string, T> = {
  [P in K]: T;
};
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', number>;

function makeActionCreator(type: string, ...argNames: any) {
  return function (...args: any) {
    let action = { type };
    argNames.forEach((arg: any, index: number) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
export default function Index() {
  return <div>advancedType</div>;
}
