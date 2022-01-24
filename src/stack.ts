type StackNode = {
  head?: StackNode;
  value: String | number;
};

interface Stack<T> {
  push: (value: String | number) => void;
  pop: () => T;
  getSize: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  getTop: () => T | undefined;
}

class StackImpl implements Stack<StackNode> {
  private size = 0;
  private head: StackNode | undefined = undefined;

  constructor(private sizeLimit: number) {}

  push: (value: String | number) => void = (value) => {
    if (this.size + 1 > this.sizeLimit) {
      throw new Error("Stack overflow");
    }

    const head = this.head;
    const node: StackNode = { head, value };

    this.head = node;
    this.size++;
  };
  pop: () => StackNode = () => {
    if (this.head === undefined) {
      throw new Error("Null pointer exception");
    }

    const node: StackNode = this.head;

    this.head = node.head;
    this.size--;

    return node;
  };
  getSize: () => number = () => this.size;
  isEmpty: () => boolean = () => (this.size === 0 ? true : false);
  clear: () => void = () => {
    this.head = undefined;
    this.size = 0;
  };
  getTop: () => StackNode | undefined = () => this.head;
}
