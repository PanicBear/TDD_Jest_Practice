type StubNode = String | number;

interface Stack<T> {
  push: (value: T) => void;
  pop: () => T;
  getSize: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  getTop: () => T | undefined;
}

class StackImpl implements Stack<StubNode> {
  private stack = new Array<StubNode>();

  constructor(private sizeLimit: number) {}

  push: (value: StubNode) => void = (value) => {
    if (this.stack.length + 1 > this.sizeLimit) {
      throw new Error("Stack overflow");
    }
    this.stack.push(value);
  };
  pop: () => StubNode = () => {
    const node: StubNode | undefined = this.stack.pop();
    if (node === undefined) {
      throw new Error("Null pointer exception");
    }
    return node;
  };
  getSize: () => number = () => this.stack.length;
  isEmpty: () => boolean = () => (this.stack.length === 0 ? true : false);
  clear: () => void = () => {
    this.stack = new Array<StubNode>();
  };
  getTop: () => StubNode | undefined = () => this.stack[this.stack.length - 1];
}
export default StackImpl;
