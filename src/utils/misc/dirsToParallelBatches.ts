export const dirsToParallelBatches = (dirs: string[]): string[][] => {
  let result: string[][] = [];
  if (!dirs.length) {
    return result;
  }
  // Sort the input array based on the number of "/" symbols in the paths
  dirs.sort((a, b) => {
    const aDepth = a.split("/").length;
    const bDepth = b.split("/").length;
    return bDepth - aDepth;
  });
  let maxSlashes = dirs[0].split("/").length;
  let batch: string[] = [];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const dirDepth = dir.split("/").length;
    if (dirDepth === maxSlashes) {
      batch.push(dir);
    } else {
      result = [...result, batch];
      maxSlashes = dirDepth;
      batch = [dir];
    }
  }
  if (batch.length) {
    result = [...result, batch];
  }

  return result;
};
