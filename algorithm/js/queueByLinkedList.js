class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;//头节点
        this.tail = null;//尾节点
    }
    enqueue(element) {
        let node = new Node(element);
        if (this.head == null) {
            this.head = node;
            this.tail = this.head
        } else {
            this.tail.next = node;
            this.tail = this.tail.next
        }

    }
    dequeue() {
        if (this.head == null) return -1;
        let value = this.head.element;
        this.head = this.head.next;
        return value
    }
}