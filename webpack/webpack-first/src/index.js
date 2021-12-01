//index.js
import './index.less'
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

fetch(`https://hn.algolia.com/api/v1/search?query=react`)
.then(res=>res.json())
.then(res=>console.log(res))
const dog = new Animal('dog');


class Cate extends Animal{
    
}
console.log(99999)