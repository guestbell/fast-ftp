type Tree = {
  root: string;
  branches?: Tree;
};

export const createTree = (splitted: string[][]): Tree[] => {yarn};

export const getParallelDirectories = (allDirs: string[]): string[][] => {
  const split = allDirs.map((a) => a.split("/").filter((a) => a));
};
