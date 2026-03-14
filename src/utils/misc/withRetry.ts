export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  onRetry?: (retriesLeft: number, err: unknown) => void,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0) {
      onRetry?.(retries, err);
      return withRetry(fn, retries - 1, onRetry);
    }
    throw err;
  }
}
