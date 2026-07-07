import { withTimeoutFunction } from "./withTimeout";

describe("withTimeoutFunction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("clears timeout timer when operation resolves quickly", async () => {
    const wrapped = withTimeoutFunction(async () => "ok", 60_000, "timed out");

    await expect(wrapped()).resolves.toBe("ok");
    expect(jest.getTimerCount()).toBe(0);
  });

  it("clears timeout timer when operation rejects quickly", async () => {
    const wrapped = withTimeoutFunction(
      async () => {
        throw new Error("boom");
      },
      60_000,
      "timed out"
    );

    await expect(wrapped()).rejects.toThrow("boom");
    expect(jest.getTimerCount()).toBe(0);
  });

  it("rejects with timeout error message when operation exceeds timeout", async () => {
    const wrapped = withTimeoutFunction(
      () => new Promise<never>(() => {}),
      50,
      "renameAsync timed out"
    );

    const pending = wrapped();
    expect(jest.getTimerCount()).toBe(1);

    jest.advanceTimersByTime(50);

    await expect(pending).rejects.toThrow("renameAsync timed out");
    expect(jest.getTimerCount()).toBe(0);
  });
});
