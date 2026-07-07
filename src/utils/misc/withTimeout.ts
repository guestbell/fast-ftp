export function withTimeoutPromise<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMsg = "Operation timed out"
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error(errorMsg));
    }, timeoutMs);

    promise.then(
      (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        reject(error);
      }
    );
  });
}

export function withTimeoutFunction<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  timeoutMs: number,
  errorMessage = "Operation timed out"
): (...args: TArgs) => Promise<TResult> {
  return (...args: TArgs) => {
    return withTimeoutPromise(fn(...args), timeoutMs, errorMessage);
  };
}
