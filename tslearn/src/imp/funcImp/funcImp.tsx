import * as React from 'react';

let myAdd: (a: number, b: number) => number = function (a: number, b: number): number {
  return a + b;
};

let myAdd1: (a: number, b: number) => number = function (a, b) {
  return a + b;
};
function myAdd2(a: number, b: number): number {
  return a + b;
}

function buildName(fitstname = 'ma', lastname: string): void {
  console.log(1);
}
function buildName1(l: string, f?: string): void {
  console.log(1);
}

function buildName2(first: string, ...restOfName: string[]): void {
  console.log(1);
}
buildName2('liz', '1', '2', '3');

interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let p = cardPicker();

export default function Index() {
  return <div>func</div>;
}
