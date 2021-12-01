import '@babel/polyfill'

class Point {
    constructor(x, y) {
        this.x = x; this.y = y;
    };
    getX() { return this.x; }
}

let cp = new ColorPoint(25, 8);




const fn = () => {
    console.log('a');
};

const isHas = [1, 2, 3].includes(2);
const p = new Promise((resolve, reject) => {
    resolve('ok')
}).then(res => console.log(res))