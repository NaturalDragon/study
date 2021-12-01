import * as React from 'react';

class Octopus {
  readonly name: string;
  readonly count: number = 9;
  constructor(theName: string) {
    this.name = theName;
  }
}

const oct = new Octopus('lizn');
//oct.name = 'zhuzhu';

class Octopus2 {
  constructor(readonly name: string) {}
}
const oct2 = new Octopus2('ddd');
console.log(oct2.name);

const fullNameMaxLength = 10;
class Employee {
  static age = 1000;
  static sayHi(): void {
    console.log('hi');
  }
  private _fullName = '';
  get fullName() {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error('fullName has a max length of ' + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}

const em = new Employee();
em.fullName = 'wo';
console.log(em.fullName);
console.log(Employee.age);
Employee.sayHi();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('earch');
  }
}
class Cat extends Animal {
  makeSound(): void {
    console.log('ext');
  }
  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}
let c: Animal;
c = new Cat();

const cat = new Cat();
cat.generateReports();
function Index() {
  return <div>interface</div>;
}

export default Index;
