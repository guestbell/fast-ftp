import { removeKeys } from "./removeKeys";

describe("removeKeys", () => {
  it("should return the same object if it is not an object or an array", () => {
    expect(removeKeys(null, [])).toBe(null);
    expect(removeKeys(undefined, [])).toBe(undefined);
    expect(removeKeys(123, [])).toBe(123);
    expect(removeKeys("abc", [])).toBe("abc");
  });

  it("should remove the specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: { d: 3, e: 4 } };
    const keys = ["b", "e"];
    const result = removeKeys(obj, keys);

    expect(result).toEqual({ a: 1, c: { d: 3 } });
  });

  it("should remove the specified keys from nested objects and arrays", () => {
    const obj = {
      a: [
        { b: 1, c: { d: 2, e: 3 } },
        { f: 4, g: 5 },
      ],
      h: { i: { j: 6, k: 7 }, l: [8, 9, { m: 10, n: 11 }] },
    };
    const keys = ["c", "e", "g", "k"];
    const result = removeKeys(obj, keys);

    expect(result).toEqual({
      a: [{ b: 1 }, { f: 4 }],
      h: { i: { j: 6 }, l: [8, 9, { m: 10, n: 11 }] },
    });
  });

  it("should not modify the original object", () => {
    const obj = { a: 1, b: 2 };
    const keys = ["b"];
    removeKeys(obj, keys);

    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
