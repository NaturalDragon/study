function Node(element){
    this.element=element;
    this.next=null;
    this.previous =null
}

function LinkedList(){
    this.head=new Node('head');//头节点
    this.find=find;//查找节点
    this.insert=insert;//插入节点
    this.remove=remove;//删除节点
    this.findPrev=findPrev;//查找前一节点
    this.display=display;//显示链表
}

function find(item){
    let currentNode=this.head;
    while(!(currentNode==null)&&currentNode.element!==item){
        currentNode=currentNode.next
    }
    return currentNode;
}

function insert(newElement,item){
    let newNode=new Node(newElement);
    let currentNode=this.find(item);
    if(currentNode==null)throw new Error('current item is not in linkedlist')
    
    newNode.next=currentNode.next;
    newNode.previous=currentNode;
    currentNode.next=newNode
}
function findPrev(){

}
function remove(item){
        let currentNode=this.find(item)
        if(currentNode.next!=null){
            currentNode.previous.next=currentNode.next;
            currentNode.next.previous=currentNode.previous;
            currentNode.previous=null;
            currentNode.next=null
        }else{
            currentNode.previous.next=null
        }
}
//删除节点

// function remove ( item ) {
//     var currNode = this.find ( item );
//     if( !( currNode.next == null ) ){
//         currNode.previous.next = currNode.next;
//         currNode.next.previous = currNode.previous;
//         currNode.next = null;
//         currNode.previous = null;
//     }
// }
function display(){
    let currentNode=this.head;
    while(!(currentNode.next===null)){
        console.log(currentNode.next);
        currentNode=currentNode.next
    }
}