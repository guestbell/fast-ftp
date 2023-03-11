export class ItemPool<T> {
  private items: T[] = [];
  private waiting: Array<(item: T) => void> = [];

  constructor(items: T[]) {
    this.items = items;
  }

  async acquire(): Promise<T> {
    if (this.items.length > 0) {
      const item = this.items.shift()!;
      return item;
    } else {
      return new Promise<T>((resolve) => {
        this.waiting.push(resolve);
      });
    }
  }

  async acquireAll(): Promise<T[]> {
    const acquiredItems: T[] = [];
    while (this.items.length > 0) {
      const item = this.items.shift()!;
      acquiredItems.push(item);
    }
    if (acquiredItems.length === 0) {
      return new Promise<T[]>((resolve) => {
        this.waiting.push((item: T) => {
          resolve([item]);
        });
      });
    } else {
      return acquiredItems;
    }
  }

  release(item: T) {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift()!;
      resolve(item);
    } else {
      this.items.push(item);
    }
  }

  releaseMany(items: T[]) {
    items.forEach((item) => {
      this.release(item);
    });
  }
}
