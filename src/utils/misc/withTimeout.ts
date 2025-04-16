export function withTimeoutPromise<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMsg = "Operation timed out"
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeoutMs)
    ),
  ]);
}

export function withTimeoutFunction<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  timeoutMs: number,
  errorMessage = "Operation timed out"
): (...args: TArgs) => Promise<TResult> {
  return (...args: TArgs) => {
    return Promise.race([
      fn(...args),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
      ),
    ]);
  };
}
