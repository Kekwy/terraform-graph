export interface Queue<T> {
  push(item: T): void;

  pop(): T | undefined;

  peek(): T | undefined;

  size(): number;

  empty(): boolean;
}

class QueueNode<T> {
  constructor(public value: T, public next: QueueNode<T> | null = null) {
  }
}

export class LinkedListQueue<T> implements Queue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private _size: number = 0;

  push(item: T): void {
    const newNode = new QueueNode(item);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this._size++;
  }

  pop(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this._size--;
    return value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  size(): number {
    return this._size;
  }

  empty(): boolean {
    return this._size === 0;
  }
}
