import * as React from 'react';

interface Point {
  readonly x: number;
  readonly y: number;
}
const p1: Point = { x: 1, y: 2 };
//p1.x = 2;
console.log(p1.x);
const p2 = { x: 2, y: 9 } as Point;
p2.x;

interface SearchFunc {
  (source: string, substring: string): boolean;
}
const mySearch: SearchFunc = function (src, sub) {
  const result = src.search(sub);
  return result > -1;
};
mySearch('1', '2');

interface StringArray {
  readonly [index: number]: string;
}
const myArray: StringArray = ['lizn', 'cy', 'liyf'];
//myArray[0] = 'l';
console.log(`myArray:${myArray[0]}`);
interface StringArray1 {
  [index: string]: string;
}

interface IClockConstructor {
  new (hour: number, minute: number): IClock;
}
interface IClock {
  currentTime?: Date;
  setTime(d: Date): void;
}
const Clock: IClockConstructor = class Clock implements IClock {
  currentTime: Date;
  setTime(d: Date): void {
    this.currentTime = d;
  }
  constructor(hour: number, min: number) {
    this.currentTime = new Date();
  }
};
const cc = new Clock(1, 2);
cc.setTime(new Date());

export default function Index() {
  return <div>interface</div>;
}
