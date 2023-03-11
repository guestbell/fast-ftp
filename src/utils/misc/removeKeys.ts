export const removeKeys = (obj: any, keys: string[]): object =>
  obj !== Object(obj)
    ? obj
    : Array.isArray(obj)
    ? obj.map((item) => removeKeys(item, keys))
    : Object.keys(obj)
        .filter((k) => !keys.includes(k))
        .reduce(
          (acc, x) => Object.assign(acc, { [x]: removeKeys(obj[x], keys) }),
          {}
        );
