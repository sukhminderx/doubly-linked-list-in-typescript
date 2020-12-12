export class Node implements INode {
    data: number;
    prev: Node | null;
    next: Node | null;
    constructor(el: number) { // ideally any 
        this.data = el;
        this.prev = null;
        this.next = null;
    }
    set _next(node: Node | null) {
        this.next = node;
    }
    get _next() {
        return this.next;
    }
    set _prev(node: Node | null) {
        this.prev = node;
    }
    get _prev() {
        return this.prev;
    }
    get _data() {
        return this.data;
    }
}

/* node has pointers to both previous and next nodes */
interface INode {    
    data: number;
    prev: Node | null;
    next: Node | null;
}

