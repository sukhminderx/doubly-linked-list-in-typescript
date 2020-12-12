import { Node } from "./Node";
/*
  Advantages over Single Linked List
  -> can navigate in both directions
  
  Disadvantages
  -> more space complexity as extra pointer is needed
  -> insertion/deletion takes more time as 2 pointers are needed to be updated
*/
export class DoublyLinkedList {
  // head always points to first node
  // last node's next is always null
  // first node's prev is always null
  head: Node | null;
  constructor() {
    this.head = null;
  }

  /*
    construct a node with data
    its next should be what is head as we are inserting in beginning
    as it's first node and will be head, the prev is set to null
    head points to this node as it is at beginning
  */
  insertAtBeginning(data: number) {
    const node = new Node(data);
    node._prev = null;
    node._next = this.head;
    this.head = node;
  }

  /*
    construct a node with data
    its next should be null as it is to be at end
    its prev should be last node
    traverse till end to get last node
    last node's next should point to new node
  */
  insertAtEnd(data: number) {
    const node = new Node(data);
    node._next = null;
    const lastNode = this.traverseAndReturnLastNode();
    node._prev = lastNode;
    lastNode._next = node;
  }

  /*
    initialise the node
    get needed node by traversing till it
    newNode next to be neededNode.next
    newNode's prev becomes neededNode
    neededNode.next's prev to be newNode
    neededNode.next to be newNode
  */
  insertAfterNode(after: number, data: number) {
    const newNode = new Node(data);
    const neededNode = this.traverseTillNode(after);
    const nextOfNeededNode = neededNode._next as Node;

    newNode._next = nextOfNeededNode;
    newNode._prev = neededNode;
    nextOfNeededNode._prev = newNode;
    neededNode._next = newNode;
  }

  /*
    head should point directly to head.next as head points to first node
    thus, we bypass the head(first) node
    prev of the new node should again become null bcz earlier it was head
  */
  deleteFirstNode () {
    this.head = this.head?._next as Node;
    this.head._prev = null;
  }

  /*
    traverse till lastNode
    also, get penultimateNode
    penultimateNode.next = null
  */
  deleteLastNode () {
    const penultimateNode = this.traverseAndReturnPenultimateNode(); // T=O(n)
    penultimateNode._next = null; // T=O(n)+O(1)=O(n)
    // O(n) + O(n)=O(n)
  }


  /*
    reach the prevNode to specific node by traversing
    prevNode next to be nodeWithData's next
    new prevNode.next's prev to be prevNode
  */
  deleteSpecificNode (data: number) {
    const prevNode = this.traverseTillPrevNode(data);
    const nodeWithData = prevNode._next as Node;
    prevNode._next = nodeWithData._next;
    (prevNode._next as Node)._prev = prevNode;
    // add nullchecks for 1st and last node
  }

  /*
    iterate over currentNode starting from head
    last node's next is null
    print each node meanwhile
  */
  traverseAndPrintNode() {
    let currentNode = this.head as Node;
    if(currentNode){
      while (currentNode.next !== null) { 
        console.log(currentNode._data);   
        currentNode = currentNode.next;
      }
      console.log(currentNode._data);
    }
  }


  /* helper methods */

  /*
    iterate over currentNode starting from head
    last node's next is null
  */
 traverseAndReturnLastNode(): Node {
  let currentNode = this.head as Node;
  while (currentNode.next !== null) {    
    currentNode = currentNode.next;
  }
  return currentNode;
}

  /*
    iterate over currentNode starting from head
    needed node's _data is currentNode.data
  */
  traverseTillNode(data: number): Node {
    let currentNode = this.head as Node;
    while (currentNode.data !== data) {
      currentNode = currentNode.next as Node;
    }
    return currentNode;
  }

  /*
    iterate over currentNode starting from head
    last node's next is null
  */
  traverseAndReturnPenultimateNode(): Node {
    let currentNode = this.head as Node;
    let penultimateNode: Node | null = null;
    while (currentNode.next !== null) {
      penultimateNode = currentNode;
      currentNode = currentNode.next;
    }
    return penultimateNode as Node;
  }

  /*
    iterate over currentNode starting from head
    keep prevNode in memory
    needed node's _data is prevNode.data
  */
  traverseTillPrevNode(data: number): Node {
    let currentNode = this.head as Node;
    let prevNode: Node | null = null;
    while (currentNode.data !== data) {
      prevNode = currentNode;
      currentNode = currentNode.next as Node;
    }
    return prevNode as Node;
  }


}
