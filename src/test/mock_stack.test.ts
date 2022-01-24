import StackImpl, { StackNode } from "../stack";
jest.mock("../stack");

describe("stack", () => {
  let stack: StackImpl;

  let sizeLimit = 0;
  let size = 0;
  let head: StackNode | undefined = undefined;

  const push = jest.fn((value: String | number) => {
    if (size + 1 > sizeLimit) {
      throw new Error("Stack overflow");
    }

    const node: StackNode = { head, value };

    head = node;
    size++;
  });
  const pop = jest.fn(() => {
    if (head === undefined) {
      throw new Error("Null pointer exception");
    }

    const node: StackNode = head;

    head = node.head;
    size--;
    return node;
  });
  const getSize = jest.fn(() => size);
  const isEmpty = jest.fn(() => (size === 0 ? true : false));
  const clear = jest.fn(() => {
    head = undefined;
    size = 0;
  });
  const getTop = jest.fn(() => head);

  (StackImpl as jest.Mock).mockImplementation((limit) => {
    sizeLimit = limit;
    size = 0;
    head = undefined;
    return {
      push,
      pop,
      getSize,
      isEmpty,
      clear,
      getTop,
    };
  });

  beforeEach(() => {
    stack = new StackImpl(3);
    jest.clearAllMocks();
  });

  describe("push", () => {
    it("should change head and size when push item", () => {
      stack.push("first Item");
      stack.push(2);
      stack.push("3");
      stack.pop();

      const size = stack.getSize();
      const top = stack.getTop();

      expect(size).toBe(2);
      expect(top).toEqual({
        head: { value: "first Item", head: undefined },
        value: 2,
      });
    });
    it("should thorw overflow exception push items over stack limitSize", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(() => stack.push(4)).toThrowError("Stack overflow");
    });
  });

  describe("pop", () => {
    it("should empty when pop all items after pushed items", () => {
      stack.push(1);
      stack.pop();

      const size = stack.getSize();
      const head = stack.getTop();

      expect(size).toBe(0);
      expect(head).toBeUndefined();
    });
    it("returns item after execution", () => {
      stack.push(1);
      stack.push("second item");
      const item = stack.pop();

      expect(item).toEqual({
        head: {
          head: undefined,
          value: 1,
        },
        value: "second item",
      });
    });
    it("should throw Null pointer exception when pop without item", () => {
      stack.push(1);
      stack.pop();

      expect(() => stack.pop()).toThrowError("Null pointer exception");
    });
  });

  describe("getSize", () => {
    it("returns count of items", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.pop();

      const size = stack.getSize();

      expect(size).toBe(2);
    });
    it("returns zero without items", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.pop();
      stack.pop();
      stack.pop();

      const size = stack.getSize();

      expect(size).toBe(0);
    });
  });

  describe("isEmpty", () => {
    it("should return true stack is initialized", () => {
      const isEmpty = stack.isEmpty();

      expect(isEmpty).toBeTruthy();
    });
    it("should return true when stack is empty", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.pop();
      stack.pop();
      stack.pop();

      const isEmpty = stack.isEmpty();

      expect(isEmpty).toBeTruthy();
    });
    it("should return false when stack has item left", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.pop();
      stack.pop();

      const isEmpty = stack.isEmpty();

      expect(isEmpty).toBeFalsy();
    });
  });

  describe("clear", () => {
    it("should remove all the item stored in stack", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.clear();

      const size = stack.getSize();
      const head = stack.getTop();

      expect(size).toBe(0);
      expect(head).toBeUndefined();
      expect(() => stack.pop()).toThrowError("Null pointer exception");
    });
    it("should nothing happens without item", () => {
      stack.clear();

      const size = stack.getSize();
      const head = stack.getTop();

      expect(size).toBe(0);
      expect(head).toBeUndefined();
      expect(() => stack.pop()).toThrowError("Null pointer exception");
    });
  });

  describe("getTop", () => {
    it("shows top item of stack without change", () => {
      stack.push(1);

      const top = stack.getTop();
      const size = stack.getSize();

      expect(top).toEqual({ head: undefined, value: 1 });
      expect(size).toBe(1);
    });
  });
});
