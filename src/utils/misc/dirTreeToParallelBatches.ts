import { Tree } from "./getDirTree";

export const dirTreeToParallelBatches = (trees: Tree[]): string[][] => {
  if (!trees.length) {
    return [];
  }

  const batches: string[][] = [];

  // Push all the root directories into the first batch
  const firstBatch = trees.map((tree) => tree.root);
  batches.push(firstBatch);

  // For each subsequent batch, push the directories from the next layer down
  let currentLayer = trees;
  while (currentLayer.some((tree) => tree.branches)) {
    const nextLayer: Tree[] = [];
    const batch: string[] = [];

    // Collect all the next layer directories and push them into the batch
    for (const tree of currentLayer) {
      if (tree.branches) {
        nextLayer.push(...tree.branches);
        const branchPaths = tree.branches.map((branch) => branch.absRoot);
        batch.push(...branchPaths);
      }
    }

    if (batch.length > 0) {
      batches.push(batch);
    }

    currentLayer = nextLayer;
  }

  return batches.reverse().map((batch) => [...new Set(batch)]);
};
