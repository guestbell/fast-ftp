import { getClients } from "./getClients";

jest.mock("ftp", () => {
  const { EventEmitter } = require("events");

  return class MockClient extends EventEmitter {
    connect() {
      this.emit("ready");
    }

    end() {
      return undefined;
    }

    rename(_oldName: string, _newName: string, callback: (err?: Error) => void) {
      callback();
    }

    mkdir(_path: string, callback: (err?: Error) => void) {
      callback();
    }

    rmdir(
      _path: string,
      recursiveOrCallback: boolean | ((err?: Error) => void),
      callback?: (err?: Error) => void
    ) {
      const cb =
        typeof recursiveOrCallback === "function"
          ? recursiveOrCallback
          : callback;
      cb?.();
    }

    put(
      _path: string,
      _remotePath: string,
      callback: (err?: Error) => void
    ) {
      callback();
    }

    delete(_path: string, callback: (err?: Error) => void) {
      callback();
    }

    list(
      _path: string,
      callback: (err: Error | null, data: Array<{ name: string }>) => void
    ) {
      callback(null, []);
    }
  };
});

describe("getClients timeout wrapper integration", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("successful wrapped helper call does not leave timeout timer active", async () => {
    const clients = await getClients({})(1, { operationTimeout: 60_000 });

    expect(clients).toHaveLength(1);
    await expect(clients[0].renameAsync("old", "new")).resolves.toBeUndefined();
    expect(jest.getTimerCount()).toBe(0);
  });
});
